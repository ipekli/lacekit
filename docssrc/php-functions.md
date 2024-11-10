---
layout: default
title: PHP Functions
nav_order: 3
---

# PHP Functions

This is an overview of useful PHP functions and variables provided by LaceKit.
They let you work with data easily and make your prototype feel real.

## Function Reference

| Function | Description and Parameters |
|----------|---------------------------|
| `__()` | (Two underscores) Returns the translation for the provided key. Returns the value of the key when no translation is found.<br><br>Parameters:<br>- **key**: The key to translate<br>- **language** (optional): The language to translate to. Defaults to current active language<br><br>Usage: `__($key)` or `__($key, $language)` |
| `alert()` | Builds the HTML for a Bootstrap Alert.<br><br>Parameters:<br>- **text**: The alert text (can contain HTML)<br>- **class** (optional): Bootstrap alert modifier class (info/success/warning/danger)<br>- **icon** (optional): Font Awesome icon name<br>- **id** (optional): Custom alert ID<br>- **dismiss** (optional): Boolean to make alert dismissable (default: true)<br><br>Usage: `alert($text)` or `alert($text, $class)` |
| `forceLogin()` | Forces user login to access the requested page. Shows login form if user is not logged in.<br><br>Usage: `forceLogin()` |
| `getDeeplink()` | Returns link to current page including GET Parameters and automatic user login. Useful for role-based prototypes.<br><br>Usage: `getDeeplink()` |
| `getFirstUserLogin()` | Gets the email of the first user specified in users.yml file.<br><br>Usage: `getFirstUserLogin()` |
| `getUniqueId()` | Returns an incremented unique identifier number.<br><br>Parameters:<br>- **variableName** (optional): Variable name for unique ID tracking<br><br>Usage: `getUniqueId()` or `getUniqueId($variableName)` |
| `hideIf()` | Outputs the class "hide" if current user is in specified usergroups.<br><br>Parameters:<br>- **usergroups**: Comma-separated list of affected usergroups<br><br>Usage: `hideIf("admin, superadmin")` |
| `includeIf()` | Includes specified file if current user is in specified usergroups.<br><br>Parameters:<br>- **usergroups**: Comma-separated list of affected usergroups<br>- **file**: Path to file to include<br><br>Usage: `includeIf("admin", "path/to/file")` |
| `makeDateFromString()` | Converts text description to date format.<br><br>Parameters:<br>- **string**: Text datetime description<br>- **format** (optional): PHP date format pattern<br><br>Usage: `makeDateFromString("last Thursday")` |
| `reorder()` | Reorders array by specified key values.<br><br>Parameters:<br>- **array**: Array to reorder<br>- **column**: Key to sort by<br>- **direction** (optional): "asc" or "desc" (default: asc)<br><br>Usage: `reorder($array, $column)` |
| `showIf()` | Opposite of hideIf() - shows content for specified usergroups.<br><br>Parameters:<br>- **usergroups**: Comma-separated list of affected usergroups<br><br>Usage: `showIf("admin, superadmin")` |
| `today()` | Returns today's date in configured format.<br><br>Parameters:<br>- **format** (optional): PHP date format pattern<br><br>Usage: `today()` or `today("Y-m-d")` |
| `tomorrow()` | Returns tomorrow's date in configured format.<br><br>Parameters:<br>- **format** (optional): PHP date format pattern<br><br>Usage: `tomorrow()` or `tomorrow("Y-m-d")` |
| `yesterday()` | Returns yesterday's date in configured format.<br><br>Parameters:<br>- **format** (optional): PHP date format pattern<br><br>Usage: `yesterday()` or `yesterday("Y-m-d")` |

## Variables

| Variable | Description |
|----------|-------------|
| `$lastUniqueId` | Returns the last value assigned by getUniqueId() |
| `$currentYear` | Returns current year as four digit number |
| `$loggedIn` | Boolean indicating if user is logged in |
| `$justloggedIn` | Boolean true only on page called by login form |
| `$activeUser` | Array of current active user data (false if not logged in) |
| `$username` | Active user's username |
| `$usermail` | Active user's email |
| `$userrole` | Active user's role |
| `$userpermissions` | Array of user permissions from users.yml | 