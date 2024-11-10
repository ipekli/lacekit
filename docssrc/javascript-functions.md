---
layout: default
title: JavaScript Functions
nav_order: 4
---

# JavaScript Functions

This is an overview of useful Helper Classes and JavaScript functions.
They help you make your prototype interactive and playful.

## Helper Classes

| Class | Description and Attributes |
|-------|---------------------------|
| `.btn-spinner` | If a button with this class is clicked its label is replaced by a spinner for the duration of a second.<br><br>Data attributes: None |
| `.checkall` | Used in table headers to check all checkboxes in the column.<br><br>Data attributes:<br>- **data-class**: The class the checkboxes must have to be affected |
| `.copyToClipboard` | Copies the content of the element specified in the data-target attribute to the clipboard.<br><br>Data attributes:<br>- **data-target**: The element of which the content is to be copied |
| `.fakeReload` | When clicked, triggers a fake reload for the element specified in the data-target attribute. The target element is replaced with a spinner for 1 second.<br><br>Data attributes:<br>- **data-target**: The element that is to be replaced by the spinner |
| `.loginUser` | When clicked, logs in the user specified by the data-key attribute. Requires a login form on the page.<br><br>Data attributes:<br>- **data-key**: The email address that identifies the user to log in |
| `.passwordToggle` | Added to an input-group-addon with a .fa-square icon. Clicking it toggles password visibility.<br><br>Data attributes: None |
| `.selectOnFocus` | When added to an input field, the content gets selected on focus.<br><br>Data attributes: None |
| `.toggleMultiPrimary` | When added to a button group, clicking buttons toggles the .btn-primary class. Multiple buttons can have the primary class.<br><br>Data attributes: None |
| `.toggleSinglePrimary` | When added to a button group, clicking buttons adds .btn-primary class while removing it from other buttons.<br><br>Data attributes: None |
| `.tooltiptrigger` | Adds Bootstrap tooltip functionality to elements.<br><br>Data attributes:<br>- **data-hide**: (optional) Number of milliseconds after which the tooltip is closed |
| `.trigger` | Buttons with this class filter elements of a group.<br><br>Data attributes:<br>- **data-group**: The selector class for the elements<br>- **data-item**: The selector class of elements to be shown |

## Function Reference

| Function | Description and Parameters |
|----------|---------------------------|
| `countDown()` | Reads the content of the specified element, subtracts 11% and writes a rounded value back.<br><br>Parameters:<br>- **target**: The element affected<br><br>Usage: ```countDown(target)``` |
| `showTooltip()` | Triggers a tooltip programmatically from inside jQuery.<br><br>Parameters:<br>- **target**: The element over which the tooltip is shown<br>- **text**: The tooltip text<br><br>Usage: ```showTooltip(target, text)``` |
| `updateSessionVar()` | Sends an AJAX request to update the specified session variable.<br><br>Parameters:<br>- **updateType**: Type of update ("set", "push", "remove", or "null")<br>- **variable**: Name of the variable (can include full path, e.g. "news.1.title")<br>- **value**: The new value<br><br>Usage: ```updateSessionVar(updateType, variable, value)``` |

## Usage Examples

### Button Spinner