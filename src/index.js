import 'offline-js/offline.min'
import axios from 'axios'

class Request {
    
    constructor() {
        Offline.options = {
            interceptRequests   : false,
            requests            : false
        }

        Offline.on('up', () => {
          this.checkPendingRequests()
        })

        this.checkPendingRequests()

        this.eRequests = []
    }

    checkPendingRequests() {
        let eRequests = localStorage.getItem("eRequests")

        if ((eRequests !== null)&&(eRequests !== 'undefined')) {

            this.eRequests = JSON.parse(eRequests)

            return this.sendPendingRequests()
        }

        return false
    }

    sendPendingRequests() {
        let requests = this.eRequests
        let sendRequest = (item) => axios(item)

        if (requests.length === 0) {
            return false
        }

        axios.all(requests.map((item) => {
            requests.splice(requests.indexOf(item), 1)
            return sendRequest(item)
        }))
        .then(() =>  {
            this.eRequests = requests
            this.updateFailedRequests()
        })
        .catch(() => false)

        return true
    }

    queueFailedRequests(requestData) {
        this.eRequests.push(requestData)

        this.updateFailedRequests()
    }

    updateFailedRequests() {
        localStorage.setItem("eRequests", JSON.stringify(this.eRequests))
    }

    removeFailedRequests() {
       localStorage.removeItem('eRequests')
    }

    send(request, data = null) {

        if (typeof request !== 'object') {
            request = {
                method  : 'post',
                url     : request,
                data    : data
            }
        }

        return axios(request)
               .catch(() => this.queueFailedRequests(request))
    }
}

export default Request
