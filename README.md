<h3 align="center">
  <a href="packages/@arranjae/react-analytics">@arranjae/react-analytics</a>
</h3>

<p align="center">
  <a href="https://facebook.github.io/react">React</a> Analytics Module <br />
  <a href="https://badge.fury.io/js/%40arranjae%2Freact-analytics"><img src="https://badge.fury.io/js/%40arranjae%2Freact-analytics.svg" alt="npm version" height="18"></a>
</p>

### React Google Analytics Module

[![Build Status](https://img.shields.io/travis/react-ga/react-ga/master.svg?style=flat-square)](https://travis-ci.org/react-ga/react-ga)
[![npm version](https://img.shields.io/npm/v/react-ga.svg?style=flat-square)](https://www.npmjs.com/package/react-ga)
[![npm downloads](https://img.shields.io/npm/dm/react-ga.svg?style=flat-square)](https://www.npmjs.com/package/react-ga)

## Integrations

- [`react-ga`](https://www.npmjs.com/package/react-ga) - React Google Analytics Module

## Minimum requirement

### react-ga @ v3.1+

- React.js >= 16.3.0 (new context API + forward ref)

## Getting started

`npm install @arranjae/react-analytics`

or

`yarn add @arranjae/react-analytics`

or in the browser (global variable `ReactAnalytics`):

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.js"></script>
<script crossorigin src="https://unpkg.com/@arranjae/react-analitics@1.0.0/umd/reactCookie.min.js"></script>
```

## `<AnalyticsProvider />`

Set the user google Analytics hooks

This tracker is used in client-side, but you need use AnalyticsProvider to import module and to become available in your page.

## `useAnalytics()`

Use ReactGA and yourConfig inside AppContext using React hooks.

```jsx
const [analytics, config] = useAnalytics();
```

**React hooks are available starting from React 16.8**

### `analytics`

Reference to module before initialized in provider component

### `config` \*(optional)

Javascript object passed in provider with your configs

## `withAnalytics(Component)`

Give access to your ReactGA implementation anywhere. Add the following props to your component:

- reactGA: ReactGA implementation to execute events (event, pageView, ecommerce, etc.) >> see documentation (https://www.npmjs.com/package/react-ga)
- config: Optional - Javascript object with your configs |
  ex. `{trackerName: 'MyTracker', trackerId: 'UA-000000-00}`.

Your original static properties will be hoisted on the returned component. You can also access the original component by using the `WrappedComponent` static property. Example:

```jsx
function MyComponent() {
  return null;
}
const NewComponent = withAnalytics(MyComponent);
NewComponent.WrappedComponent === MyComponent;
```

## Analytics

### `Analytics`

This is 'react-ga' module

## Simple Example with React hooks

```js
// Root.jsx
import React from 'react';
import App from './App';
import { AnalyticsProvider } from '@arranjae/react-analytics';

export default function Root() {
  const config = {
    trackerName: 'AnalyticsTracker',
    trackerId: 'UA-000000-00',
  };
  const options = {
    debug: process.env.NODE_ENV !== 'production',
    testMode: process.env.NODE_ENV === 'test',
    alwaysSendToDefaultTracker: false,
  };

  return (
    <AnalyticsProvider config={config} trackerInfo={config.trackerId} options={options}>
      <App />
    </AnalyticsProvider>
  );
}
```

```js
// App.jsx
import React from 'react';
import { useAnalytics } from '@arranjae/react-analytics';

import NameForm from './NameForm';

function App() {
  const [analytics, config] = useAnalytics();

  analytics.pageView('/');

  return (
    <div>
      <h1>Its works!! Look in developer tools yours events</h1>
      <button
        onClick={() => {
          analytics.event(
            {
              category: 'button-event',
              action: 'clicked',
            },
            [config.trackerName]
          );
        }}
      >
        click me!
      </button>
    </div>
  );
}

export default App;
```

## Simple Example with Higher-Order Component

```js
// Root.jsx
import React from 'react';
import App from './App';
import { AnalyticsProvider } from '@arranjae/react-analytics';

export default function Root() {
  const config = {
    trackerName: 'AnalyticsTracker',
    trackerId: 'UA-000000-00',
  };
  const options = {
    debug: process.env.NODE_ENV !== 'production',
    testMode: process.env.NODE_ENV === 'test',
    alwaysSendToDefaultTracker: false,
  };

  return (
    <AnalyticsProvider config={config} trackerInfo={config.trackerId} options={options}>
      <App />
    </AnalyticsProvider>
  );
}
```

```js
// App.jsx
import React, { Component } from 'react';
import { instanceOf, shape } from 'prop-types';
import { withAnalytics, Analytics } from '@arranjae/react-analytics';

class App extends Component {
  static propTypes = {
    analytics: instanceOf(Analytics).isRequired,
    config: shape({}).isRequired,
  };

  constructor(props) {
    super(props);

    const { analytics, config } = props;

    this.analytics = analytics;
    this.config = config;
  }

  componentDidMount() {
    this.analytics.pageView('/', [this.config.trackerName], 'Page Name');
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.analytics.event(
              {
                category: 'button-event',
                action: 'clicked',
              },
              [this.config.trackerName]
            );
          }}
        >
          click me!
        </button>
      </div>
    );
  }
}

export default withAnalytics(App);
```

## Server-Rendering Example

```js
// src/components/App.js
import React from 'react';
import { useAnalytics } from '@arranjae/react-analytics';

function App() {
  const [analytics, config] = useAnalytics();

  analytics.pageView('/', [config.trackerName]); // this option "config.tracker" is optional when has one tracker

  analytics.event(
    {
      category: 'enter-page',
      action: 'use react-analytics',
    },
    [config.trackerName]
  );

  return (
    <div>
      <h1>It's works!!</h1>
      <button
        onClick={() => {
          analytics.event(
            {
              category: 'button-event',
              action: 'clicked',
            },
            [config.trackerName]
          );
        }}
      >
        click me!
      </button>
    </div>
  );
}

export default App;
```

```js
// src/server.js
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { AnalyticsProvider } from '@arranjae/react-analytics';

import Html from './components/Html';
import App from './components/App';

export default function middleware(req, res) {
  const config = {
    trackerName: 'AnalyticsTracker',
    trackerId: 'UA-000000-00',
  };
  const options = {
    debug: process.env.NODE_ENV !== 'production',
    testMode: process.env.NODE_ENV === 'test',
    alwaysSendToDefaultTracker: false,
  };

  const markup = ReactDOMServer.renderToString(
    <AnalyticsProvider config={config} trackerInfo={config.trackerId} options={options}>
      <App />
    </AnalyticsProvider>
  );

  const html = ReactDOMServer.renderToStaticMarkup(<Html markup={markup} />);

  res.send('<!DOCTYPE html>' + html);
}
```

```js
// src/client.js
import React from 'react';
import ReactDOM from 'react-dom';
import { AnalyticsProvider } from '@arranjae/react-analytics';

import App from './components/App';

const appEl = document.getElementById('main-app');

const config = {
  trackerName: 'AnalyticsTracker',
  trackerId: 'UA-000000-00',
};
const options = {
  debug: process.env.NODE_ENV !== 'production',
  testMode: process.env.NODE_ENV === 'test',
  alwaysSendToDefaultTracker: false,
};

ReactDOM.render(
  <AnalyticsProvider config={config} trackerInfo={config.trackerId} options={options}>
    <App />
  </AnalyticsProvider>,
  appEl
);
```
