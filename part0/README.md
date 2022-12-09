### 0.4: New note diagram
```
note over browser:
1. The user enters the submission content.
2. Clicks the submit button.
end note

browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
server-->browser: HTML-code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server:  https://studies.cs.helsinki.fi/exampleapp/main.js
server-->browser: main.js

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [{"content":"111","date":"2022-12-09T05:18:32.808Z"},...]

browser->server: HTTP GET https://studies.cs.helsinki.fi/favicon.ico

note over browser:
browser executes the event handler
that renders notes to display
end note


```


### 0.5: Single page app diagram
```
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
server-->browser: HTML-code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server:  https://studies.cs.helsinki.fi/exampleapp/spa.js
server-->browser: spa.js

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [{"content":"wu","date":"2022-12-09T08:27:19.584Z"},...]

browser->server: HTTP GET https://studies.cs.helsinki.fi/favicon.ico
```



### 0.6: New note in Single page app diagram
```
note over browser:
1. The user enters the content.
2. Clicks the save button.
end note

browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
```