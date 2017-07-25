/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Game from "./Game";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Button,
} from 'react-native';


AppRegistry.registerComponent('Project', () => Game);
