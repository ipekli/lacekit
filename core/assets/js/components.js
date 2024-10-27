class Datepicker extends HTMLElement {
  constructor () {
    super()
    // Regardless of sundayFirst value, set monday as first, sunday as last, always:
    this.dayNames = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
    this.monthNames = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
    this.sundayFirst = false
    this.placeholder = 'tt.mm.jjjj'
    this.persistOnSelect = false
    this.longPressThreshold = 500
    this.longPressInterval = 150
    this.value = null
    this.ignoreOnFocus = false
    this.showCloseIcon = false
    this.size = null
    this._inputStrIsValidDate = false
    this._longPressIntervalIds = []
    this._longPressTimerIds = []
    this._calTemplate = `
    <div class="calContainer" tabindex="0">
      <div class="calHeader">
        <div class="calCtrl calCtrlPrevYear">&laquo;&laquo;</div>
        <div class="calCtrl calCtrlPrevMonth">&laquo;</div>
        <div class="calTitle"></div>
        <div class="calCtrl calCtrlNextMonth">&raquo;</div>
        <div class="calCtrl calCtrlNextYear">&raquo;&raquo;</div>
        <div class="calCtrl calCtrlHideCal">x</div>
      </div>
      <div class="calGrid">
        <div class="calDayName"></div>
        <div class="calDayName"></div>
        <div class="calDayName"></div>
        <div class="calDayName"></div>
        <div class="calDayName"></div>
        <div class="calDayName"></div>
        <div class="calDayName"></div>
        <div class="calDay"></div>
        <div class="calDay"></div>
        <div class="calDay"></div>
        <div class="calDay"></div>
        <div class="calDay"></div>
        <div class="calDay"></div>
        <div class="calDay"></div>
        <div class="calDay"></div>
        <div class="calDay"></div>
        <div class="calDay"></div>
        <div class="calDay"></div>
        <div class="calDay"></div>
        <div class="calDay"></div>
        <div class="calDay"></div>
        <div class="calDay"></div>
        <div class="calDay"></div>
        <div class="calDay"></div>
        <div class="calDay"></div>
        <div class="calDay"></div>
        <div class="calDay"></div>
        <div class="calDay"></div>
        <div class="calDay"></div>
        <div class="calDay"></div>
        <div class="calDay"></div>
        <div class="calDay"></div>
        <div class="calDay"></div>
        <div class="calDay"></div>
        <div class="calDay"></div>
        <div class="calDay"></div>
        <div class="calDay"></div>
        <div class="calDay"></div>
        <div class="calDay"></div>
        <div class="calDay"></div>
        <div class="calDay"></div>
      </div>
    </div>`
  }

  static get observedAttributes () {
    return ['value',
      'ignore-on-focus',
      'sunday-first',
      'persist-on-select',
      'show-close-icon',
      'size']
  }

  disconnectedCallback () {
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'value') {
      this.value = newValue
    } else if (name === 'ignore-on-focus') {
      this.ignoreOnFocus = true
    } else if (name === 'sunday-first') {
      this.sundayFirst = true
    } else if (name === 'persist-on-select') {
      this.persistOnSelect = true
    } else if (name === 'show-close-icon') {
      this.showCloseIcon = true
    } else if (name === 'size') {
      this.size = newValue
    }
  }

  connectedCallback () {
    setTimeout(() => { this.init() }, 0) // https://stackoverflow.com/questions/58676021/accessing-custom-elements-child-element-without-using-slots-shadow-dom
  }

  init () {
    
    
    this.textInputElement = this.querySelector('sl-input') || document.createElement('sl-input')
    this.textInputElement.setAttribute('placeholder', this.placeholder)
    if (this.size) {
      this.textInputElement.setAttribute('size', this.size)
    }
    this.textInputElement.innerHTML = '<sl-icon name="calendar" slot="prefix"></sl-icon>'
    var mainContainer = document.createElement('div')
    mainContainer.style.display = 'inline-block'
    if (this.container) {
      this.container.remove()
    }
    this.container = this.appendChild(mainContainer) // The returned value is the appended child

    const template = document.createElement('template')
    template.innerHTML = this._calTemplate

    this.container.appendChild(this.textInputElement)
    this.container.appendChild(template.content)

    this.calTitle = this.querySelector('.calTitle')
    this.calContainer = this.querySelector('.calContainer')
    this.dateObj = new Date()
    var obj

    if (this.value !== null) {
      obj = this._parseAndValidateInputStr(this.value)
      if (obj.valid) {
        this.dateObj = new Date(obj.year, obj.month, obj.day)
        this._inputStrIsValidDate = true
        this.textInputElement.value = this._returnDateString(this.dateObj)
      } else if (this.value === 'current' || this.value === 'heute' || this.value === 'today') {
        this._inputStrIsValidDate = true
        this.textInputElement.value = this._returnDateString(this.dateObj)
      }
    } else if (this.textInputElement.value) {
      obj = this._parseAndValidateInputStr(this.textInputElement.value)
      if (obj.valid) {
        this.dateObj = new Date(obj.year, obj.month, obj.day)
        this._inputStrIsValidDate = true
      } else {
        this._inputStrIsValidDate = false
      }
    } else {
      this._inputStrIsValidDate = false
    }
    this.value = null

    this.displayedMonth = this.dateObj.getMonth()
    this.displayedYear = this.dateObj.getFullYear()

    this._populateDayNames()
    this._renderCalendar()

    if (!this.ignoreOnFocus) {
      this.textInputElement.onfocus = this._inputOnFocusHandler.bind(this)
    }

    this.textInputElement.oninput = this._inputOnInputHandler.bind(this)

    this.textInputElement.onblur = this._blurHandler.bind(this)

    this.calContainer.onblur = this._blurHandler.bind(this)

    if (!this.showCloseIcon) {
      this.querySelector('.calCtrlHideCal').style.display = 'none'
    }

    this._addHeaderEventHandlers(); // Attach event handlers after the header is added
  }

  setFocusOnCal () {
    if (this.calContainer) {
      this.calContainer.style.display = 'block'
      this.calContainer.focus()
    }
  }

  _dayClickedEventHandler (event) {
    this._inputStrIsValidDate = true
    this._setNewDateValue(event.target.innerHTML, this.displayedMonth, this.displayedYear)
    this.textInputElement.value = this._returnDateString(this.dateObj)
    this.textInputElement.dispatchEvent(new CustomEvent('dateselect'))
    this._renderCalendar()
    if (!this.persistOnSelect) {
      this._hideCalendar()
    }
  }

  _hideCalendar () {
    document.activeElement.blur()
  }

  _calKeyDownEventHandler (event) {
    if (event.key === 'Enter') {
      this._dayClickedEventHandler(event)
    }
  }

  _blurHandler () {
    // When the input element loses focus due to click on calContainer, new focus won't be directly set to calContainer, it is set to body.
    // After calContainer onclick, focus will be on body unless following delay is introduced:
    setTimeout(() => { checkActiveElement(this) }, 0)
    function checkActiveElement (ctx) {
      if (!(document.activeElement.classList.contains('calContainer') || document.activeElement.classList.contains('calCtrl') || document.activeElement.classList.contains('calDay') || document.activeElement.isSameNode(ctx.textInputElement))) {
        ctx.calContainer.style.display = 'none'
        ctx._mouseUpEventHandler()
        if (!ctx._inputStrIsValidDate) {
          ctx.textInputElement.dispatchEvent(new Event('invalid'))
        }
      }
    }
  }

 
  _addHeaderEventHandlers () {
    this.headerElement = this.querySelector('.calHeader');
    
    if (this.headerElement) {
      const prevMonthButton = this.headerElement.querySelector('.calCtrlPrevMonth');
      const nextMonthButton = this.headerElement.querySelector('.calCtrlNextMonth');
      const prevYearButton = this.headerElement.querySelector('.calCtrlPrevYear');
      const nextYearButton = this.headerElement.querySelector('.calCtrlNextYear');
      
      if (prevMonthButton) {
        prevMonthButton.addEventListener('click', this._showPrevMonth.bind(this));
      } else {
        console.warn('Previous month button not found in the header');
      }
      
      if (nextMonthButton) {
        nextMonthButton.addEventListener('click', this._showNextMonth.bind(this));
      } else {
        console.warn('Next month button not found in the header');
      }
      
      if (prevYearButton) {
        prevYearButton.addEventListener('click', this._showPrevYear.bind(this));
      } else {
        console.warn('Previous year button not found in the header');
      }
      
      if (nextYearButton) {
        nextYearButton.addEventListener('click', this._showNextYear.bind(this));
      } else {
        console.warn('Next year button not found in the header');
      }
    } else {
      //console.error('Header element is null or undefined in _addHeaderEventHandlers');
    }
  }

  _startLongPressAction (event) {
    this._longPressIntervalIds.push(setInterval(() => { this._controlKeyDownEventHandler(event) }, this.longPressInterval))
    this.querySelector('#' + event.target.id).onclick = () => { this._onClickHandlerAfterLongPress(event, this) }
  }

  // For better UX, after long press, onclick must be discarded once,
  // thus do nothing with the event and set clickhandler back to the real one:
  _onClickHandlerAfterLongPress (event, ctx) {
    ctx.querySelector('#' + event.target.id).onclick = ctx._controlKeyDownEventHandler
    ctx.querySelector('#' + event.target.id).onclick = ctx.querySelector('#' + event.target.id).onclick.bind(ctx)
  }
  _mouseDownEventHandler (event) {
    this._longPressTimerIds.push(setTimeout(() => { this._startLongPressAction(event) }, this.longPressThreshold))
  }

  _mouseUpEventHandler () {
    this._longPressTimerIds.forEach(clearTimeout)
    this._longPressTimerIds = []
    this._longPressIntervalIds.forEach(clearInterval)
    this._longPressIntervalIds = []
  }

  _parseAndValidateInputStr (str) {
    var obj = {}
    var day, month, year
    var value = str.match(/^\s*(\d{1,2})\.(\d{1,2})\.(\d\d\d\d)\s*$/)
    if (value === null) {
      obj.valid = false
    } else {
      day = Number(value[1])
      month = Number(value[2])
      year = Number(value[3])
      if (this._dateIsValid(day, month, year)) {
        obj.valid = true
        obj.day = day
        obj.month = month - 1
        obj.year = year
      } else {
        obj.valid = false
      }
    }
    return obj
  }

  _inputOnInputHandler () {
    var obj = this._parseAndValidateInputStr(this.textInputElement.value)
    if (obj.valid) {
      this._inputStrIsValidDate = true
      this._setNewDateValue(obj.day, obj.month, obj.year)
      this.displayedMonth = obj.month
      this.displayedYear = obj.year
      this.textInputElement.dispatchEvent(new CustomEvent('dateselect'))
      this._renderCalendar()
    } else {
      this._inputStrIsValidDate = false
    }
  }

  _dateIsValid (day, month, year) {
    if (month < 1 || month > 12) {
      return false
    }
    var last_day_of_month = this._daysInMonth(month, year)
    if (day < 1 || day > last_day_of_month) {
      return false
    }
    return true
  }

  _controlClickEventHandler (event) {
    if (event.type === 'click') {
      if (event.target.classList.contains('calCtrlPrevYear')) {
        this._showPrevYear()
      } else if (event.target.classList.contains('calCtrlNextYear')) {
        this._showNextYear()
      } else if (event.target.classList.contains('calCtrlPrevMonth')) {
        this._showPrevMonth()
      } else if (event.target.classList.contains('calCtrlNextMonth')) {
        this._showNextMonth()
      } else if (event.target.classList.contains('calCtrlHideCal')) {
        this._hideCalendar()
      }
    }
  }

  _inputOnFocusHandler () {
    this._inputOnInputHandler()
    this.calContainer.style.display = 'block'
  }

  _showNextYear () {
    this.displayedYear++
    this._renderCalendar()
  }

  _showPrevYear () {
    this.displayedYear--
    this._renderCalendar()
  }

  _showNextMonth () {
    if (this.displayedMonth === 11) {
      this.displayedMonth = 0
      this.displayedYear++
    } else {
      this.displayedMonth++
    }
    this._renderCalendar()
  }

  _showPrevMonth () {
    if (this.displayedMonth === 0) {
      this.displayedMonth = 11
      this.displayedYear--
    } else {
      this.displayedMonth--
    }
    this._renderCalendar()
  }

  _renderCalendar () {
    var tempDate = new Date(this.displayedYear, this.displayedMonth)
    tempDate.setDate(1)
    this.calTitle.innerHTML = this.monthNames[this.displayedMonth] + ' ' + this.displayedYear
    var dayNumbers = []
    var adjacentMonthDays = []
    this._generateDayArray(tempDate, dayNumbers, adjacentMonthDays)
    var entries = this.calContainer.querySelectorAll('.calDay').entries()
    var entry = entries.next()
    while (entry.done === false) {
      entry.value[1].classList.remove('calAdjacentMonthDay')
      entry.value[1].classList.remove('calSelectedDay')
      entry.value[1].classList.remove('calHiddenRow')
      entry.value[1].classList.remove('calDayStyle')
      entry.value[1].classList.remove('today') // Remove the "today" class if it exists
      entry.value[1].onclick = null
      entry.value[1].onblur = null
      entry.value[1].onkeydown = null
      if (adjacentMonthDays[entry.value[0]]) {
        entry.value[1].classList.add('calAdjacentMonthDay')
      } else {
        entry.value[1].classList.add('calDayStyle')
      }
      entry.value[1].innerHTML = dayNumbers[entry.value[0]]
      if (this.displayedMonth === this.dateObj.getMonth() && this.displayedYear === this.dateObj.getFullYear() && dayNumbers[entry.value[0]] === this.dateObj.getDate() && !adjacentMonthDays[entry.value[0]]) {
        entry.value[1].classList.add('calSelectedDay')
      }
      if (this.displayedMonth === new Date().getMonth() && this.displayedYear === new Date().getFullYear() && dayNumbers[entry.value[0]] === new Date().getDate() && !adjacentMonthDays[entry.value[0]]) {
        entry.value[1].classList.add('today')
      }
      if (!adjacentMonthDays[entry.value[0]]) {
        entry.value[1].onclick = this._dayClickedEventHandler
        entry.value[1].onclick = entry.value[1].onclick.bind(this)
        entry.value[1].onkeydown = this._calKeyDownEventHandler
        entry.value[1].onkeydown = entry.value[1].onkeydown.bind(this)
        entry.value[1].tabIndex = 0
        entry.value[1].onblur = this._blurHandler
        entry.value[1].onblur = entry.value[1].onblur.bind(this)
      } else {
        entry.value[1].removeAttribute('tabindex')
      }
      entry = entries.next()
    }

    // checking if last (=lowest) row of days are all adjacent month days:
    var lastSeven = adjacentMonthDays.slice(35, 42)
    if (lastSeven.every(x => x === true)) {
      entries = this.calContainer.querySelectorAll('.calDay').entries()
      entry = entries.next()
      while (entry.done === false) {
        if (entry.value[0] > 34) {
          entry.value[1].classList.add('calHiddenRow')
        }
        entry = entries.next()
      }
    }
  }

  getDateString () {
    if (this._inputStrIsValidDate) {
      return this._returnDateString(this.dateObj)
    }
    return null
  }

  getDateObject () {
    if (this._inputStrIsValidDate) {
      return this.dateObj
    }
    return null
  }

  _setNewDateValue (day, month, year) {
    day = Number(day)
    month = Number(month)
    year = Number(year)
    if (day !== this.dateObj.getDate() || month !== this.dateObj.getMonth() || year !== this.dateObj.getFullYear()) {
      // Order is important, always set year first:
      this.dateObj.setFullYear(year)
      // Do not use setDate here:
      // this.dateObj.setDate(day) <-- https://stackoverflow.com/questions/14680396/the-date-getmonth-method-has-bug
      // Use setMonth with 2 params instead:
      this.dateObj.setMonth(month, day)
    }
  }

  _returnDateString (date) {
    var year = date.getFullYear()
    var month = (date.getMonth() + 1).toString().padStart(2, '0')
    var day = date.getDate().toString().padStart(2, '0')
    return day + '.' + month + '.' + year
  }

  _populateDayNames () {
    var dayNameArray = []
    dayNameArray = this.dayNames.slice()
    if (this.sundayFirst) {
      dayNameArray.pop()
      dayNameArray.unshift(this.dayNames[6])
    }
    var entries = this.calContainer.querySelectorAll('.calDayName').entries()
    var entry = entries.next()
    while (entry.done === false) {
      entry.value[1].innerHTML = dayNameArray[entry.value[0]]
      entry = entries.next()
    }
  }

  _generateDayArray (date, dayArray, adjacentMonthDaysArray) {
    var index
    var dateDay = date.getDay()
    var dateMonth = date.getMonth() + 1
    var dateYear = date.getFullYear()
    var daysInMonth = this._daysInMonth(dateMonth, dateYear)

    date.setDate(date.getDate() - 1)
    var prevMonth = date.getMonth() + 1
    var prevMonthYear = date.getFullYear()
    var daysInPrevMonth = this._daysInMonth(prevMonth, prevMonthYear)

    // prev month day filling:
    if (this.sundayFirst) {
      for (index = 0; index < dateDay; index++) {
        dayArray.unshift(daysInPrevMonth)
        daysInPrevMonth--
        adjacentMonthDaysArray.push(true)
      }
    } else {
      if (dateDay === 0) {
        for (index = 0; index < 6; index++) {
          dayArray.unshift(daysInPrevMonth)
          daysInPrevMonth--
          adjacentMonthDaysArray.push(true)
        }
      } else {
        for (index = 0; index < dateDay - 1; index++) {
          dayArray.unshift(daysInPrevMonth)
          daysInPrevMonth--
          adjacentMonthDaysArray.push(true)
        }
      }
    }

    // current month day filling:
    for (index = 0; index < daysInMonth; index++) {
      dayArray.push(index + 1)
      adjacentMonthDaysArray.push(false)
    }

    // next month day filling:
    var numberOfNextMonthDays = 42 - dayArray.length
    for (index = 0; index < numberOfNextMonthDays; index++) {
      dayArray.push(index + 1)
      adjacentMonthDaysArray.push(true)
    }
  }

  _isItLeapYear (year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)
  }

  _daysInMonth (month, year) {
    if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
      return 31
    } else if (month === 4 || month === 6 || month === 9 || month === 11) {
      return 30
    } else if (month === 2 && this._isItLeapYear(year)) {
      return 29
    } else if (month === 2 && !(this._isItLeapYear(year))) {
      return 28
    }
  }
}

customElements.define('date-picker', Datepicker)