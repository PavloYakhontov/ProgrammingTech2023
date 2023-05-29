export function sendHttpRequest(method: string, uri: string, body=null, headers=null) {
  return new Promise((good, err) => {
    const xhreq = new XMLHttpRequest();

    xhreq.onload = () => {
      good(xhreq.response);
    }

    xhreq.onerror = () => {
      err(`An error occurred in flameless http requester: ${xhreq.status} ${xhreq.statusText}`)
    }

    xhreq.open(method, uri, true);
    headers && Object.keys(headers).forEach(key => xhreq.setRequestHeader(key, headers[key]))
    xhreq.send(body)
  })
}

export function sendAnotherHttpRequest(method: string, uri: string, body=null, headers=null) {
  return new Promise((good, err) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, uri, true);
    headers && Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]))
    
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        good(xhr.response);
      } else {
        err(`An error occurred in flameless http requester: ${xhr.status} ${xhr.statusText}`)
      }
    }
    xhr.send(body);
  })
}
