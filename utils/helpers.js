import { Constants, Notifications, Permissions } from 'expo';
import { AsyncStorage } from 'react-native';

export const STACK_STORAGE_KEY = 'Flashcards:stack';

export function createDeck(deckTitle, question) {
  return {
    [deckTitle]: {
      title: deckTitle,
      question: question ? question : [],
    },
  };
}

const NOTIFICATION_KEY = 'Flashcards:notifications';

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync());
}

export function createNotification() {
  return {
    title: 'Time to Learn!',
    body: 'Don\'t forget to run through your flashcards today.',
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    },
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then((results) => {
            if (Constants.lisDevice && results.status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate + 1);
              tomorrow.setHours(20);
              tomorrow.setMinutes(0);

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              );
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          });
      }
    });
}
