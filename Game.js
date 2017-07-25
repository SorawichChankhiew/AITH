import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableHighlight,
    AsyncStorage

} from 'react-native';
var timeLimit = 10;
var timer = null;
var Monkey = React.createClass({
    render() {
        return (
            <TouchableHighlight style={styles.touch}
                onPress={this.props.onPress}>
                <Text style={styles.monkey}>{this.props.show ? '🐵' : ''}</Text>
            </TouchableHighlight >
        )
    }
})
const STORAGE_KEY= '@Project:data'
export default class ble extends Component {
    constructor() {
        super();
        this.state = {
            highScore: 0,
            timeCount: 0,
            score: 0,
            playing: false,
            holes: [false, false, false, false, false, false, false, false, false],
            x:0
        }
        this._save=this._save.bind(this);
        this.componentDidMount();
    }
    _startGame() {
        this.setState({
            timeCount: timeLimit,
            playing: true,
            score: 0,
        });
        monkey = setInterval(() => {
            var currentHoles = this.state.holes;
            currentHoles[Math.floor(Math.random() * 9)] = true;
            if (!Math.floor(Math.random() * 2)) {
                currentHoles = [false, false, false, false, false, false, false, false, false]
            }
            this.setState({
                holes: currentHoles,
            })
            if (!this.state.playing) {
                clearInterval(monkey);
                this.setState({
                    holes: [false, false, false, false, false, false, false, false, false]
                })
            }
        }, 250);
        timer = setInterval(() => {
            this.setState({
                timeCount: this.state.timeCount - 1,
            });
            if (this.state.timeCount == 0) {
                this._stopGame();
                
            }
        }, 1000);
    }
    _stopGame() {
        clearInterval(timer);
        this.setState({
            playing: false,
            highScore: (this.state.score > this.state.highScore) ? this.state.score : this.state.highScore,
        })
        this._save();
    }
    _handleTouch(holeNumber) {
        if (this.state.holes[holeNumber]) {
            this.setState({
                score: this.state.score + 1,
            })
        }

    }

    _save(){
    AsyncStorage.setItem(STORAGE_KEY,this.state.highScore+'')
    .then(()=>console.log('saved'))
    .catch((error)=> console.log(error.message)).done();
        this.setState({
        x:this.state.highScore
    })
  }

  componentDidMount(){
    AsyncStorage.getItem(STORAGE_KEY)
    .then((value)=> {
      this.setState({
        x: value,
      })
    })
    .catch((error)=> console.log('AsyncStorage:'+error.message))
  }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.scoreRow}>
                    <View style={styles.highScore}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>High Score</Text>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 30 }}>{this.state.x}</Text>
                    </View>
                    <View style={styles.timeCount}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Time</Text>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 30 }}>{this.state.timeCount}</Text>
                    </View>
                    <View style={styles.currentScore}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Score</Text>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 30 }}>{this.state.score}</Text>
                    </View>
                </View>

                <View style={styles.holesRow}>
                    <View style={styles.holes}>
                        <Monkey show={this.state.holes[0]}
                            onPress={() => this._handleTouch(0)} />
                    </View>
                    <View style={styles.holes}>
                        <Monkey show={this.state.holes[1]}
                            onPress={() => this._handleTouch(1)} />
                    </View>
                    <View style={styles.holes}>
                        <Monkey show={this.state.holes[2]}
                            onPress={() => this._handleTouch(2)} />
                    </View>
                </View>
                <View style={styles.holesRow}>
                    <View style={styles.holes}>
                        <Monkey show={this.state.holes[3]}
                            onPress={() => this._handleTouch(3)} />
                    </View>
                    <View style={styles.holes}>
                        <Monkey show={this.state.holes[4]}
                            onPress={() => this._handleTouch(4)} />
                    </View>
                    <View style={styles.holes}>
                        <Monkey show={this.state.holes[5]}
                            onPress={() => this._handleTouch(5)} />
                    </View>
                </View>
                <View style={styles.holesRow}>
                    <View style={styles.holes}>
                        <Monkey show={this.state.holes[6]}
                            onPress={() => this._handleTouch(6)} />
                    </View>
                    <View style={styles.holes}>
                        <Monkey show={this.state.holes[7]}
                            onPress={() => this._handleTouch(7)} />
                    </View>
                    <View style={styles.holes}>
                        <Monkey show={this.state.holes[8]}
                            onPress={() => this._handleTouch(8)} />
                    </View>
                </View>
                <View style={styles.button}>
                    <View style={styles.buttonRow}>
                        <Button
                            title="Start Game"
                            color="#ace572"
                            onPress={this._startGame.bind(this)}
                            disabled={this.state.playing} />
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5fcff',
    },
    scoreRow: {
        flex: 1,
        backgroundColor: 'grey',
        flexDirection: 'row',
    },
    highScore: {
        backgroundColor: '#ace572',
        flex: 1,
        alignItems: 'center',
    },
    timeCount: {
        backgroundColor: '#ace572',
        flex: 1,
        alignItems: 'center',
    },
    currentScore: {
        backgroundColor: '#ace572',
        flex: 1,
        alignItems: 'center',
    },
    holesRow: {
        backgroundColor: 'white',
        flex: 2,
        flexDirection: 'row',
    },
    buttonRow: {
        flex: 1,
        backgroundColor: 'white',
    },
    button: {
        flexDirection: 'row',
    }
    ,
    holes: {
        borderWidth: 5,
        borderColor: '#487de4',
        flex: 1,
        backgroundColor: '#a1e4d3',
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    monkey: {
        fontSize: 60,

    },
    touch: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})