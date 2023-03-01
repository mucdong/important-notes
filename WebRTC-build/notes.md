# This note for WebRTC iOS lib building
## Source
Source for this build: [https://github.com/stasel/WebRTC/releases](https://github.com/stasel/WebRTC/releases)
Version at time using in CC Home App is 108.0.0
## First steps
1. Download source of build from above link
2. Edit info in build.sh script file ```scripts/build.sh```
```sh
DEBUG="${DEBUG:-false}"
BUILD_VP9="${BUILD_VP9:-false}"
BRANCH="${BRANCH:-branch-heads/5359}" # This is branch of 108.0.0 version
IOS="${IOS:-true}" # Build for iOS
MACOS="${MACOS:-false}"
MAC_CATALYST="${MAC_CATALYST:-false}"
```
## Notice in build.sh file
- Step 2: it will download tools, then pull WebRTC source into ```src``` folder
- Step 3 -> : start build
- If we want to change/modify/update source code files in ```src```, we can wait for build progress finish, in the next time, it won't pull source code again
## Modify source code files
- In CC Home App, we need to modify some codes: 
    - change in class: RTCMTLVideoView
    - 2 files in folder: ```../scripts/src/sdk/objc/components/renderer/metal```
    - ```RTCMTLVideoView.h```, ```RTCMTLVideoView.m```
- After modify, we run build.sh again
## Start build
- Run cmd: ```sudo sh build.sh```
- I added sudo just for make root permisson for process, we may not need ```sudo```
- After build done, it will create Framework in folder ```src/out```
## Merge ```simulator``` and ```device``` frameworks into one
- Run cmd:
```sh
sudo xcodebuild -create-framework -framework /scripts/src/out/WebRTC.xcframework/ios-x86_64_arm64-simulator/WebRTC.framework -framework /scripts/src/out/WebRTC.xcframework/ios-arm64/WebRTC.framework -output /scripts/src/out/WebRTC.xcframework/ios-x86_64_arm64-universal/WebRTC.framework
```
