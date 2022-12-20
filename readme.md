# P28
This is just a project I challenged myself to. Its a Proxy in 28 (active development) hours. (hence the name P28). \
The amount of hours was chosen using a random number generator and has no special meaning :).

# ⏰ Log
Hour 0 is everything I did before starting the timer.

| Hour 	| Accomplished 	|
|:---:	|---	|
| 0 	| Writing this readme and doing a bit of research about Minecraft proxies. <br> Made a list of the features I want to add to the project. <br> No code has been written at this point in time. 	|
| 1 	| Managed to get a working proxy with a testing command.<br>It's quite difficult to come up with a good hierarchy of files when the clock is ticking.<br>Quite happy with how much I accomplished in one hour though, even if I had some knowledge about proxies beforehand. 	|
| 2 	| Added a logging class with log files (quite happy with this).<br>Also updated the test command to include some more info for actual testing and fixed some bugs here and there. 	|


# Features I want to add:
- [ ] Modules
  - [ ] Enabling/disabling 
- [x] Commands
  - [x] Enabling/disabling
  - [x] Description
  - [x] Name
  - [x] Aliases
  - [ ] Cooldown?
- [ ] Command ideas
  - [ ] /requeue (/rq)
  - [ ] /help
  - [ ] /prefix (always works with /)
  - [ ] /ping
	- [ ] Ping
	- [ ] Roundtrip latency
  - [ ] /Changelog
  - [ ] /better reporting
	- [ ] Reporting entire teams?
	  - [ ] @red / @blue
	- [ ] report types nicknames
	  - [ ] ka -> kill_aura / bhop -> cheating
  - [ ] /nicks -> list nicks in lobby
    - [ ] Cache usernames!
- [ ] Module ideas
  - [ ] Disabling all particles
  - [ ] AutoGG
	- [ ] Custom autoGG message
  - [ ] Enabling blocked mods? :/
  - [ ] Stat warnings
    - [ ] Bedwars
	- [ ] Duels
  - [ ] Auto dodge
	- [ ] RQ instead of leaving
	- [ ] Auto dodge maps
	- [ ] Auto dodge player names
  - [ ] Block toxicity
	- [ ] Block messages you send to prevent you from getting muted :)
	- [ ] Block incoming toxicity
  - [ ] Nick warnings
  - [ ] Highlight your IGN
- [ ] Chest menu
  - [ ] Enabling / disabling things
- [x] .TOML for settings
  - [ ] Reset settings
  - [x] Create settings template
    - [ ] Each module / command enabled
- [x] logs
  - [x] log folder
  - [x] logs get written to a file
  - [x] logs have timestamps