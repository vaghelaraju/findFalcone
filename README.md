#Finding Falcone

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
      
    1. Run `pod install` from `Shopify-RN/ios` folder
    2. Start XCode and open generated `ShopifyRN.xcworkspace`
     
    ### Android
    
    no steps required
        
4. It is recommended to run `react-native start` command from root project directory.
5. Run your project from XCode (`Cmd+R`) for iOS, or use `react-native run-android` to run your project on Android.


## Key Features:
### Select Planet Screen
- List of Planet with Name and Distance.
- In the first screen you can select any planet to send a vehicle.
- You have to select exactly 4 planets to search for the Queen AI falcone.
- Time taken is calculated based on planet distance and vehicle speed.
- FIND FALCONE! button validates your input and if it is valid and performs API call.
- On click of Reset, all data selection of planets and vehicles will be reset

### Select Vehicle Screen
- List of Vehicles with Name, Distance cover,  speed and number of count available of respective Vehicle.
- Calculation of available vehicles based on occupied Vehicles.
- If 0 vehicle available it will show ab alert on selection.

### Status screen
- It shows API call result that are returned to us with customized messages.

## Screenshots:

![Screenshot_20220715_163624](https://user-images.githubusercontent.com/99483003/179215200-783a06b2-6adf-4339-90b5-e24ec52b6d69.png)  ![Screenshot_20220715_163700](https://user-images.githubusercontent.com/99483003/179215378-d8e147a3-eeb6-4da6-b59f-a06dc447a6e3.png) ![Screenshot_20220715_163723](https://user-images.githubusercontent.com/99483003/179215431-acf84b06-d10f-4c64-8fa3-284d15239324.png) ![Screenshot_20220715_164510](https://user-images.githubusercontent.com/99483003/179215452-6bd377c5-cdf8-4a0f-b75f-a81a1d6d0fcd.png)


