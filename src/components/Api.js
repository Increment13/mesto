export default class Api {
    constructor({ url, headers = {} }) {
        this.url = url;
        this.headers = headers;
    }

    _handleResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response.statusText)
        }
    }

    _handleResponseError(err) {
        return Promise.reject(err.message)
    }

    getRequest(link) {
        return fetch(`${this.url}${link}`, { headers: this.headers })
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }

    updateRequest(data, link) {
        return fetch(
                `${this.url}${link}${data.id}`, {
                    headers: this.headers,
                    method: data.method,
                }
            )
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }

    patchRequest(data, link) {
        return fetch(`${this.url}${link}`, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify(data)
            })
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }

    postRequest(data, link) {
        return fetch(`${this.url}${link}`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    name: data.place,
                    link: data.link,
                })
            })
            .then(this._handleResponse)
            .catch(this._handleResponseError)

    }

}