import React, { Component } from 'react'
import { Text, Animated } from 'react-native'
import { connect } from 'react-redux'

import TextButton from './TextButton'
import { commonStyles } from '../utils/styles'
import { green, white, black } from '../utils/colors'

class Deck extends Component {
  state = {
    opacity: new Animated.Value(0)
  }

  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params
    return {
      title: deckId
    }
  }

  handleAddCard = () => {
    this.props.navigation.navigate(
      'NewCard',
      { deckId: this.props.deckId}
    )
  }

  handleStartQuiz = () => {
    this.props.navigation.navigate(
      'Quiz',
      { deckId: this.props.deckId}
    )
  }

  render() {
    const { deck } = this.props
    const { opacity } = this.state
    Animated.timing(opacity, { toValue: 1, duration: 1000 }).start()

    return (
      <Animated.View
        style={[
          commonStyles.darkBackground,
          commonStyles.center,
          {padding: 20, opacity}]}
        >
        <Text style={[commonStyles.cardHeader, {color: white, marginBottom: 10}]}>{deck.title}</Text>
        {deck.questions.length > 0
          ? <Text style={[commonStyles.cardSubHeader, {marginBottom: 50}]}>({deck.questions.length} cards)</Text>
          : <Text style={[commonStyles.cardSubHeader, {marginBottom: 50}]}>There are no cards, feel free to add now!</Text>
        }
        <TextButton
          onPress={this.handleAddCard}
          color={green}
          borderColor={green}
          >
          Add Card
        </TextButton>
        <TextButton
          onPress={this.handleStartQuiz}
          isDisabled={deck.questions.length === 0}
          color={black}
          borderColor={green}
          backgroundColor={green}>
          Start Quiz
        </TextButton>
      </Animated.View>
    )
  }
}

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deckId,
    deck: state[deckId]
  }

}

export default connect(mapStateToProps)(Deck)