 #### Finding Falcone

This repo is solution of below problem:

Our problem is set in the planet of Lengaburu…in the distant
distant galaxy of Tara B. After the recent war with neighbouring
planet Falicornia, King Shan has exiled the Queen of Falicornia
for 15 years.
Queen Al Falcone is now in hiding. But if King Shan can find
her before the years are up, she will be exiled for another 15
years….

 ## Build and run the app

1. Install React Native as described at [https://facebook.github.io/react-native/docs/getting-started.html#content](https://facebook.github.io/react-native/docs/getting-started.html#content)
2. Clone this repository
3. Run `yarn install` , all required components will be installed automatically

    ### iOS
      
    1. Run `pod install` from `findFalcone/ios` folder
    2. Start XCode and open generated `FindFalcone.xcworkspace`
     
    ### Android
    
    no steps required
        
4. It is recommended to run `react-native start` command from root project directory.
5. Run your project from XCode (`Cmd+R`) for iOS, or use `react-native run-android` to run your project on Android.


## Key Features:
### Select Planet and Vehicle Screen
- List of Planet with Name .
- In the first screen you can select any planet to send a vehicle.
- You have to select exactly 4 planets to search for the Queen AI falcone.
- Time taken is calculated based on planet distance and vehicle speed.
- FIND FALCONE! button validates your input and if it is valid and performs API call.
- On click of Reset, all data selection of planets and vehicles will be reset


### Status screen
- It shows API call result that are returned to us with customized messages.

## Screenshots:
![1664807928411](https://user-images.githubusercontent.com/99483003/193606282-773e7397-a483-4c45-9443-feff75236f08.jpg) !
![1664807928399 (1)](https://user-images.githubusercontent.com/99483003/193606380-665ea9da-c324-45b3-9478-ef5227c7f45f.jpg) !
![1664807928406](https://user-images.githubusercontent.com/99483003/193606003-d1694cf7-bc0e-4d0d-907a-df43e3f6d330.jpg)




