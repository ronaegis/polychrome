



<img width="640" alt="screenshot (2)" src="https://user-images.githubusercontent.com/563095/118682983-cfe83f80-b7b5-11eb-998e-83775a107aaf.png">

# Polychrome

> Forked from [arfct/polychrome](https://github.com/arfct/polychrome)

Polychrome adds a sidebar with tabs and groups to the left of your browser window. 

Now that Chrome is able to unload background tabs on its own, having many, many tabs becomes worthwhile — and the tab strip is woefully unprepared.

Polychrome lets you more carefully curate, group, and archive your tabs, building a familiar structure and giving you quick access to the things you need.

## Recent Enhancements

### Window Management & Positioning
- **Automatic Window Positioning**: Sidebar automatically follows the active Chrome window, positioning itself at the left edge and matching the window's height
- **Smart Window State Sync**: Sidebar automatically minimizes when Chrome windows are minimized and restores when they're restored
- **Enhanced Window Tracking**: Added listeners for window movement, resize, and state change events to maintain optimal sidebar positioning
- **Initial Auto-Positioning**: Sidebar automatically positions itself correctly when first created

### Tab Navigation & Visibility  
- **Improved Tab Visibility**: Fixed sidebar scrolling to ensure active tabs are always visible when switching tabs, accounting for the toolbar height to prevent tabs from being hidden behind the search bar
- **Instant Scrolling**: Disabled smooth scrolling for faster navigation between tabs

### Sidebar Instance Management
- **Unique Sidebar Instance**: Extension icon and pop-out button now focus existing sidebar instead of creating duplicates, ensuring only one sidebar exists per Chrome session
- **Smart Focus Behavior**: Sidebar appears when Chrome windows gain focus but doesn't steal focus from the active window
- **Multi-Trigger Visibility**: Sidebar visibility responds to window focus changes, tab activation, and tab updates for reliable operation

### User Experience
- **Non-Disruptive Operation**: All sidebar actions maintain focus on your current Chrome window to avoid interrupting workflow
- **Comprehensive Event Detection**: Multiple listeners ensure sidebar responds reliably to all types of window and tab interactions

## Usage:

1. Open chrome://extensions
2. Turn on Developer mode
3. Drag the root directory of this repository in.
4. Pin the toolbar button
5. Open it and pop out the window
