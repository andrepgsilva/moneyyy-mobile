import { hasOwnProperty } from './index';
import store from '../store';
import { setQueueData } from '../store/reducers/QueueReducer';

type Queue = {
  [index: string]: any
}

const ActionQueue = {
  maxQueue: 3,

  getQueueData () {
    const queue: Queue = store.getState().queue.queue;

    return queue;
  },

  setQueue (newQueue: object) {
    store.dispatch(setQueueData(newQueue));
  },

  queueIsNotFull () {
    return Object.keys(this.getQueueData()).length < this.maxQueue;
  },

  pushAnAction (actionName: string, actionWithParameters: any) {
    const queue = JSON.parse(JSON.stringify(this.getQueueData()));

    if (this.queueIsNotFull()) {
      queue[actionName] = actionWithParameters;
    }

    this.setQueue(queue);
  },

  deleteLastAction () {
    const queue = this.getQueueData();

    const queueKeys = Object.keys(this.getQueueData());
    const queueLength = queueKeys.length;

    if (queueLength > 0) {
      const lastKeyName: string = queueKeys[queueLength - 1];

      delete queue[lastKeyName];

      this.setQueue(queue);
    }
  },

  deleteAnAction (actionName: string) {
    const queue = this.getQueueData();

    const queueKeys = Object.keys(this.getQueueData());
    const queueLength = queueKeys.length;

    if (queueLength > 0) {
      if (hasOwnProperty(queue, actionName)) {
        delete queue[actionName];

        this.setQueue(queue);
      }
    }
  },

  clearQueue () {
    this.setQueue({});
  }
};

export default ActionQueue;
