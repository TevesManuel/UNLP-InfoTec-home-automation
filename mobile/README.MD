# Muy lindo y todo, la pregunta es ¿Como?, ¿Por qué?

- El principio

    Dejando el drama a un lado lo que necesitaremos es crear nuestro proyecto react-native
    ```bash
        npx @react-native-community/cli init MiApp
    ```
    Luego
    ```bash
        npm i react-native-bluetooth-classic
    ```
    Luego en ./app/src/main/AndroidManifiest.xml agregar
    ```
        <uses-permission android:name="android.permission.BLUETOOTH" />
        <uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
        <uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
        <uses-permission android:name="android.permission.BLUETOOTH_SCAN" />
        <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
        <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    ```
    Agregar en android/app/build.gradle
    ```
        implementation project(':react-native-bluetooth-classic')
    ```
    Y por ulitmo agregar en android/settings.gradle
    ```
        include ':react-native-bluetooth-classic'
        project(':react-native-bluetooth-classic').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-bluetooth-classic/android')
    ```
    
    O simplemente clona este repositorio y modificalo libremente, denada 😎👍
