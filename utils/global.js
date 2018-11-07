import { StyleSheet } from 'react-native';

import { charcoal, cream, gray, tan } from './color';

export const global = StyleSheet.create({

  buttonStyle: {
    width: '80%',
    borderRadius: 5,
    borderWidth: 2,
    padding: 15,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
  },
  card: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 10,
    backgroundColor: charcoal,
  },
  cardHeader: {
    color: cream,
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 8,
  },
  cardSubHeader: {
    color: tan,
    fontSize: 16,
    textAlign: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  darkBackground: {
    backgroundColor: charcoal,
  },
  header: {
    color: cream,
    fontSize: 50,
    fontWeight: '700',
  },
  inputField: {
    height: 50,
    borderColor: gray,
    borderWidth: 1,
    borderRadius: 5,
    width: '80%',
    paddingRight: 10,
    paddingLeft: 10,
    color: cream,
  },
  list: {
    alignSelf: 'flex-start',
    marginTop: 50,
    width: '100%',
  },
  subHeader: {
    color: cream,
    fontSize: 40,
    textAlign: 'center',
  },
  title: {
    marginBottom: 30,
    color: tan,
    fontSize: 30,
  },
  wrapper: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
});
