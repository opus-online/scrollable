# Scrollable
--------------


## Installation
```
bower install scrollable
```

### Setup requirejs
```javascript
    var requirejs = {
        "paths": {
            "jquery": "bower_components/jquery/dist/jquery",
            "hammerjs" : "bower_components/hammerjs/hammer"
            "Scrollable" : "bower_components/scrollable/src"
        }
    };
```

### Setup
```javascript
    var Scrollable = require('Scrollable/Scrollable');
    var scrollable = new Scrollable({
        selector : '#scroller',
        loadBefore : function () { //Should return a promise
            var deferred = when.defer();
            scrollable.$ul.prepend('<li>Wat</li>');
            scrollable.$ul.prepend('<li>Wat</li>');
            scrollable.$ul.prepend('<li>Wat</li>');
            deferred.resolve();
            return deferred.promise;
        },
        loadAfter : function () { //Should return a promise
            var deferred = when.defer();
            scrollable.$ul.append('<li>Wat</li>');
            scrollable.$ul.append('<li>Wat</li>');
            scrollable.$ul.append('<li>Wat</li>');
            deferred.resolve();
            return deferred.promise;
        }
    });
```

### HTML

```html
    <div id="wrapper">
        <div id="scroller">
            <ul>
                <li>One</li>
                <li>Two</li>
                <li>Three</li>
                <li>Four</li>
                <li>Five</li>
                <li>Six</li>
                <li>Seven</li>
                <li>Eight</li>
                <li>Nine</li>
                <li>Ten</li>
                <li>Eleven</li>
                <li>Twelve</li>
                <li>Fourteen</li>
                <li>Fiveteen</li>
                <li>Sixteen</li>
                <li>Seventeen</li>
                <li>Eighteen</li>
                <li>19</li>
                <li>20</li>
                <li>21</li>
                <li>22</li>
                <li>23</li>
                <li>24</li>
                <li>25</li>
                <li>26</li>
                <li>27</li>
                <li>28</li>
                <li>29</li>
                <li>30</li>
                <li>31</li>
                <li>32</li>
                <li>33</li>
                <li>34</li>
                <li>35</li>
                <li>36</li>
                <li>37</li>
                <li>38</li>
                <li>39</li>
                <li>40</li>
            </ul>
        </div>
    </div>
```

### CSS

```css
    #wrapper {
        position: absolute;
        z-index: 1;
        top: 0px;
        bottom: 0;
        left: 0;
        width: 100%;
        background: #aaa;
        overflow: hidden;
    }

    #scroller {
        height: 100%;
        float: left;
        padding: 0;
    }

    #scroller ul {
        list-style: none;
        display: block;
        float: left;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        text-align: left;
    }

    #scroller li {
        display: block;
        vertical-align: middle;
        float: left;
        padding: 0 10px;
        width: 80px;
        height: 100%;
        border-left: 1px solid #ccc;
        border-right: 1px solid #fff;
        background-color: #fafafa;
        font-size: 14px;
    }
```


### Methods

```javascript
    scroller.focus($el);  // Focus on a specific item
    scroller.move(offset); // Moves the viewport to the specified offset
```