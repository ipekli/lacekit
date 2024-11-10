---
layout: default
title: Grid System
nav_order: 5
---
<link rel="stylesheet" href="../assets/css/main.css">

# Grid System

LaceKit includes a lightweight, flexible column grid system built using flexbox. The grid system provides a functional CSS approach, giving you precise control over your layouts with minimal overhead.

## Basic Auto Layout

Each column inside the row is automatically assigned an equal share of the total width. The columns are built to respect the layout over the content.

Use the `.row` class as a container and `.col` for equal-width columns.

```html
<div class="row">
    <div class="col">Column 1</div>
    <div class="col">Column 2</div>
    <div class="col">Column 3</div>
</div>
```

<div class="row demo">
    <div class="col">Column 1</div>
    <div class="col">Column 2</div>
    <div class="col">Column 3</div>
</div>
## Column Sizes

Specify column widths using numbered classes from 1 to 12. For example, `.col-4` takes up 4 columns of space, while `.col-8` takes 8 columns.

```html
<div class="row">
    <div class="col-4">Column 1</div>
    <div class="col-8">Column 2</div>
</div>
```
<div class="row demo">
    <div class="col-4">Column 1</div>
    <div class="col-8">Column 2</div>
</div>

## Responsive Breakpoints

The grid system includes responsive breakpoints for different screen sizes:

- `sm`: Small devices (≥500px)
- `md`: Medium devices (≥744px)
- `lg`: Large devices (≥1200px)

For example, `.col-12.col-md-6.col-lg-4` creates a column that is full width on mobile, half width on medium screens, and one-third width on large screens.

## Row Modifiers

### Horizontal Alignment

Control horizontal alignment with these modifiers:
- `.row-start`: Align columns to start
- `.row-center`: Center align columns
- `.row-end`: Align columns to end


```html
<div class="row row-end">
    <div class="col">Column 1</div>
    <div class="col">Column 2</div>
</div>
```
<div class="row demo row-end">
    <div class="col">Column 1</div>
    <div class="col">Column 2</div>
</div>
### Mixed Columns
You can mix column sizes and alignments to create complex layouts.
This is the real power of flexbox at work in your layouts.
```html
<div class='row'>
  <div class='col col-fixed' style='width:80px;'>
    col col-fixed
  </div>
  <div class='col'>
    col
  </div>
  <div class='col'>
    col
  </div>
</div>
```
<div class='row demo pt2'>
  <div class='col col-fixed' style='width:80px;'>
    col col-fixed
  </div>
  <div class='col'>
    col
  </div>
  <div class='col'>
    col
  </div>
</div>

### Vertical Alignment

Adjust vertical alignment using:
- `.row-top`: Align to top
- `.row-middle`: Center align vertically
- `.row-bottom`: Align to bottom

## Column Modifiers

### Column Ordering

Change visual order with:
- `.col-first`: Move column to start
- `.col-last`: Move column to end

### Column Offsets

Use offset classes like `.col-offset-3` to create space before columns. For example, `.col-6.col-offset-3` creates a centered column with offset.

## Nesting

Rows can be nested inside columns for complex layouts. Simply place a new `.row` inside a `.col` element to create nested grids.

## Additional Features

### No Gutters
Use `.row-no-gutters` to remove spacing between columns.

### Auto Width
Use `.col-auto` to let columns size to their content, while regular `.col` elements take up the remaining space.


The grid system is designed to be intuitive and flexible while maintaining a minimal footprint. All classes follow a consistent naming convention for ease of use.