import 'offline-js/offline.min';
import axios from 'axios';

class Request {
  constructor() {
    Offline.options = {
      interceptRequests: false,
      requests: false
    };

    Offline.on('up', () => {
      this.checkInterval = setInterval(() => this.checkPendingRequests(), 1000);
    });

    this.checkPendingRequests();

    this.eRequests = [];
  }

  checkPendingRequests() {
    const eRequests = localStorage.getItem('eRequests');

    if (eRequests !== null && eRequests !== 'undefined') {
      this.eRequests = JSON.parse(eRequests);

      return this.sendPendingRequests();
    }

    return false;
  }

  sendPendingRequests() {
    let requests = this.eRequests;
    let sendRequest = item => axios(item);

    if (requests.length === 0) {
      clearInterval(this.checkInterval);
      return false;
    }

    axios
      .all(
        requests.map(item => {
          requests.splice(requests.indexOf(item), 1);
          return sendRequest(item);
        })
      )
      .then(() => {
        this.eRequests = requests;
        this.updateFailedRequests();
      })
      .catch(() => false);

    return true;
  }

  queueFailedRequests(requestData) {
    this.eRequests.push(requestData);

    this.updateFailedRequests();
  }

  getFailedRequests() {
    return this.eRequests.map(item => {
      if (item instanceof FormData) {
        return Object.fromEntries(item);
      }
      return item;
    });    
  }
  
  updateFailedRequests() {  
    localStorage.setItem('eRequests', JSON.stringify(this.getFailedRequests()));
  }

  removeFailedRequests() {
    localStorage.removeItem('eRequests');
  }

  send(request, data = null) {
    if (typeof request !== 'object') {
      request = {
        method: 'post',
        url: request,
        data: data
      };
    }

    return axios(request).catch(() => this.queueFailedRequests(request));
  }
}

export default Request;
