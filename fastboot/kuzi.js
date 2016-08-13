"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('kuzi/adapters/application', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].RESTAdapter.extend({
    namespace: 'data',

    buildURL: function buildURL() {
      return this._super.apply(this, arguments) + '.json';
    },
    shouldBackgroundReloadAll: function shouldBackgroundReloadAll() {
      return false;
    },
    shouldBackgroundReloadRecord: function shouldBackgroundReloadRecord() {
      return false;
    }
  });
});
define('kuzi/app', ['exports', 'ember', 'kuzi/resolver', 'ember-load-initializers', 'kuzi/config/environment'], function (exports, _ember, _kuziResolver, _emberLoadInitializers, _kuziConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _kuziConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _kuziConfigEnvironment['default'].podModulePrefix,
    Resolver: _kuziResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _kuziConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('kuzi/components/about-container', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    classNames: ['about-container'],
    _attachEvent: function _attachEvent() {
      this.$().mousemove(function (e) {
        var arrow = _ember['default'].$('.arrow'),
            center = [arrow.offset().left + arrow.width() / 2, arrow.offset().top + arrow.height() / 2],
            angle = Math.atan2(e.pageX - center[0], -(e.pageY - center[1])) * (180 / Math.PI);

        arrow.css('transform', 'rotate(' + angle + 'deg)');
      });
    },
    didInsertElement: function didInsertElement() {
      this._attachEvent();
    }
  });
});
define('kuzi/components/animated-caption', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    showTime: true,
    classNames: ['animated-caption'],
    didInsertElement: function didInsertElement() {
      var _this = this;

      var element = this.get('element');
      element.addEventListener('transitionend', function () {
        if (element.clientHeight === 158) {
          return _ember['default'].run(function () {
            _this.set('showTime', false);
            _this.set('showTemplate', true);
          });
        }

        _ember['default'].run(function () {
          _this.set('showTemplate', false);
          _this.set('showTime', true);
        });
      }, false);
    }
  });
});
define('kuzi/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'kuzi/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _kuziConfigEnvironment) {

  var name = _kuziConfigEnvironment['default'].APP.name;
  var version = _kuziConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('kuzi/components/expanding-description', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'p',
    expanded: false,
    short: null,
    classNameBindings: ['expanded'],
    defaultDots: '...',
    dotsDisplay: _ember['default'].computed.or('customDots', 'defaultDots'),
    shortened: _ember['default'].computed('maxLength', 'short', {
      get: function get() {
        var maxLength = this.get('maxLength');
        if (!maxLength) {
          return;
        }

        var short = this.get('short');
        if (!short) {
          return;
        }

        var additional = this.get('additional');

        if (additional) {
          var _length = short.length + additional.length;
          if (_length > maxLength) {
            this.set('dots', true);
            return short.slice(0, maxLength - additional.length);
          } else {
            return short;
          }
        }

        if (short.length > maxLength) {
          this.set('dots', true);
          return short.slice(0, maxLength - this.get('dotsDisplay.length'));
        } else {
          this.set('dots', false);
          return short;
        }
      }
    }).readOnly(),
    mouseEnter: function mouseEnter() {
      var _this = this;

      var disableExpand = this.get('disableExpand');
      if (disableExpand) {
        return;
      }

      var delay = this.get('delay');
      if (delay) {
        var timer = setTimeout(function () {
          _this.set('expanded', true);
        }, delay);
        return this.set('timer', timer);
      }

      this.set('expanded', true);
    },
    mouseLeave: function mouseLeave() {
      var disableExpand = this.get('disableExpand');
      if (disableExpand) {
        return;
      }

      this.set('expanded', false);
      var timer = this.get('timer');
      if (timer) {
        clearTimeout(timer);
      }
    }
  });
});
define('kuzi/components/highlight-match', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'span',
    display: _ember['default'].computed('bold', 'first', 'second', function () {
      var base = this.get('first');
      if (!base) {
        return;
      }

      var bold = this.get('bold');
      if (!bold) {
        return base;
      }

      if (this.get('second')) {
        base += ' ' + this.get('second');
      }

      return base.replace(new RegExp('(^|)(' + this.get('bold').trim().replace(' ', '|') + ')(|$)', 'ig'), '$1<b>$2</b>$3');
    }),
    secondaryDisplay: _ember['default'].computed('bold', 'third', function () {
      var third = this.get('third');
      if (third) {
        return third.replace(new RegExp('(^|)(' + this.get('bold').trim().replace(' ', '|') + ')(|$)', 'ig'), '$1<b>$2</b>$3');
      }
    })
  });
});
define('kuzi/components/particles-js', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    didInsertElement: function didInsertElement() {
      this._initParticles();
    },
    _initParticles: function _initParticles() {
      var ammount = window.matchMedia('(max-width: 456px)').matches ? 40 : 100;
      window.particlesJS('particles-js', {
        particles: {
          color: '#fff',
          color_random: false,
          shape: 'circle', // "circle", "edge" or "triangle"
          opacity: {
            opacity: 1,
            anim: {
              enable: true,
              speed: 5,
              opacity_min: 0,
              sync: false
            }
          },
          size: 2.5,
          size_random: true,
          nb: ammount,
          line_linked: {
            enable_auto: false,
            distance: 140,
            color: '#fff',
            opacity: 0.3,
            width: 1,
            condensed_mode: {
              enable: false,
              rotateX: 600,
              rotateY: 60
            }
          },
          anim: {
            enable: true,
            speed: 1
          }
        },
        // Retina Display Support //
        retina_detect: true
      });
    }
  });
});
define('kuzi/components/tag-display', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		tagName: 'li',
		classNames: ['label see-through-bordered'],
		classNameBindings: ['active:success']
	});
});
define('kuzi/components/time-ago', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'time',
    attributeBindings: ['href', 'datetime', 'title'],
    classNames: ['timeago'],

    datetime: _ember['default'].computed('time', {
      get: function get() {
        var time = this.get('time');
        if (time && time.toISOString) {
          return time.toISOString();
        }
      }
    }).readOnly(),

    didInsertElement: function didInsertElement() {
      this.$().timeago();
    }
  });
});
define('kuzi/components/yt-video', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    muteVideo: _ember['default'].observer('model', 'model.id', function () {
      var _this = this;

      _ember['default'].debug('component.muteVideo fired');
      var tag = document.createElement('script');
      tag.src = "//www.youtube.com/iframe_api";

      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      var player = undefined;

      function onPlayerReady() {
        player.playVideo();
        player.mute();
      }

      if (window.YT === undefined) {
        return window.onYouTubeIframeAPIReady = function () {
          _ember['default'].debug('onYouTubeIframeAPIReady');
          player = new window.YT.Player('ytplayer-' + _this.get('model.id'), {
            events: {
              'onReady': onPlayerReady
            }
          });
        };
      }

      _ember['default'].debug('window.YT !== undefined');

      player = new window.YT.Player('ytplayer-' + this.get('model.id'), {
        events: {
          'onReady': onPlayerReady
        }
      });
    }).on('didInsertElement')
  });
});
define('kuzi/controllers/about/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend();
});
define('kuzi/controllers/about', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend();
});
define('kuzi/controllers/apps/index', ['exports', 'ember'], function (exports, _ember) {
  var async = window.async;
  exports['default'] = _ember['default'].Controller.extend({
    queryParams: ['search', 'tags'],
    tags: [],
    filteredApps: _ember['default'].computed('search', 'tags.[]', {
      get: function get() {
        var _this = this;

        var applications = this.get('model.applications'),
            searchName = this.get('search'),
            tags = this.get('tags'),
            tagsIsEmpty = tags.get('length') === 0;

        if (!searchName && tagsIsEmpty) {
          return applications;
        }

        var lowercasedSearchName = undefined;
        if (searchName) {
          lowercasedSearchName = searchName.toLowerCase();
        }

        if (searchName && tagsIsEmpty) {
          return applications.filter(function (app) {
            return app.get('name').toLowerCase().indexOf(lowercasedSearchName) !== -1;
          });
        }

        if (!searchName && !tagsIsEmpty) {
          return async.filter(applications.toArray(), function (app, callback) {
            var hasAllTags = true;
            app.get('tags').then(function (resolvedTags) {
              var appTags = resolvedTags.mapBy('id');
              tags.forEach(function (predefTag) {
                if (hasAllTags) {
                  hasAllTags = appTags.includes(predefTag);
                }
              });
              callback(hasAllTags);
            });
          }, function (results) {
            _this.set('filteredApps', results);
          });
        }

        if (searchName && !tagsIsEmpty) {
          return async.filter(applications.toArray(), function (app, callback) {
            if (app.get('name').toLowerCase().indexOf(lowercasedSearchName) === -1) {
              return callback(false);
            }

            var hasAllTags = true;
            app.get('tags').then(function (resolvedTags) {
              var appTags = resolvedTags.mapBy('id');
              tags.forEach(function (predefTag) {
                if (hasAllTags) {
                  hasAllTags = appTags.includes(predefTag);
                }
              });
              callback(hasAllTags);
            });
          }, function (results) {
            _this.set('filteredApps', results);
          });
        }
      },
      set: function set(key, value) {
        return value;
      }
    }),
    highlightTags: _ember['default'].on('init', function () {
      var _this2 = this;

      _ember['default'].run.next(this, function () {
        var selectedTags = _this2.get('tags');

        if (!selectedTags || _ember['default'].get(selectedTags, 'length') === 0) {
          return;
        }

        _this2.store.findAll('tag').then(function (tags) {
          tags.forEach(function (tag) {
            tag.set('active', selectedTags.includes(tag.get('id')));
          });
        });
      });
    }),
    actions: {
      selectTag: function selectTag(tagRecord) {
        var tagId = tagRecord.get('id'),
            tags = this.get('tags');

        this.store.findRecord('tag', tagId).then(function (tag) {
          if (tags.indexOf(tagId) === -1) {
            tag.set('active', true);
            return tags.pushObject(tagId);
          }

          tag.set('active', false);
          tags.removeObject(tagId);
        });
      }
    }
  });
});
define('kuzi/controllers/apps/view', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    actions: {
      showVideo: function showVideo() {
        this.set('showVideo', true);
      }
    }
  });
});
define('kuzi/controllers/apps', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend();
});
define('kuzi/helpers/fa-icon', ['exports', 'ember-cli-font-awesome/helpers/fa-icon'], function (exports, _emberCliFontAwesomeHelpersFaIcon) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFontAwesomeHelpersFaIcon['default'];
    }
  });
  Object.defineProperty(exports, 'faIcon', {
    enumerable: true,
    get: function get() {
      return _emberCliFontAwesomeHelpersFaIcon.faIcon;
    }
  });
});
define('kuzi/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('kuzi/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('kuzi/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'kuzi/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _kuziConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_kuziConfigEnvironment['default'].APP.name, _kuziConfigEnvironment['default'].APP.version)
  };
});
define('kuzi/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('kuzi/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('kuzi/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.ArrayController.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('kuzi/initializers/export-application-global', ['exports', 'ember', 'kuzi/config/environment'], function (exports, _ember, _kuziConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_kuziConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _kuziConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_kuziConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('kuzi/initializers/fastboot/ajax', ['exports'], function (exports) {
  /* globals najax */

  var nodeAjax = function nodeAjax(options) {
    najax(options);
  };

  exports['default'] = {
    name: 'ajax-service',

    initialize: function initialize(application) {
      application.register('ajax:node', nodeAjax, { instantiate: false });
      application.inject('adapter', '_ajaxRequest', 'ajax:node');
    }
  };
});
define("kuzi/initializers/fastboot/dom-helper-patches", ["exports"], function (exports) {
  /*globals Ember, URL*/
  exports["default"] = {
    name: "dom-helper-patches",

    initialize: function initialize(App) {
      // TODO: remove me
      Ember.HTMLBars.DOMHelper.prototype.protocolForURL = function (url) {
        var protocol = URL.parse(url).protocol;
        return protocol == null ? ':' : protocol;
      };

      // TODO: remove me https://github.com/tildeio/htmlbars/pull/425
      Ember.HTMLBars.DOMHelper.prototype.parseHTML = function (html) {
        return this.document.createRawHTMLSection(html);
      };
    }
  };
});
define('kuzi/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('kuzi/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('kuzi/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("kuzi/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('kuzi/models/app', ['exports', 'ember-data', 'ember'], function (exports, _emberData, _ember) {
  exports['default'] = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    description: _emberData['default'].attr('string'),
    fullDescription: _emberData['default'].attr('string'),
    smallImage: _emberData['default'].attr('string'),
    tags: _emberData['default'].hasMany('tags', { async: true }),
    latest: _emberData['default'].attr('boolean'),
    link: _emberData['default'].attr('string'),
    added: _emberData['default'].attr('date'),
    video: _emberData['default'].belongsTo('video', { async: true }),
    images: _emberData['default'].hasMany('image', { async: true }),

    mainImage: _ember['default'].computed('images[]', {
      get: function get() {
        return this.get('images.firstObject');
      }
    }).readOnly(),

    videoOrImages: _ember['default'].computed('video', 'images', {
      get: function get() {
        var _this = this;

        this.get('images').then(function (images) {
          _this.get('video').then(function (video) {
            _this.set('videoOrImages', video || images.get('length') > 0);
          });
        });
      },
      set: function set(key, value) {
        console.log(value);
        return value;
      }
    }),

    first4Images: _ember['default'].computed('images', {
      get: function get() {
        var _this2 = this;

        this.get('images').then(function (images) {
          if (images.get('length') === 0) {
            return;
          }

          _this2.set('first4Images', images.slice(0, 4));
        });
      },
      set: function set(key, value) {
        return value;
      }
    }),

    idSort: ['id'],
    tagsSorted: _ember['default'].computed.sort('tags', 'idSort')
  });
});
define('kuzi/models/experience', ['exports', 'ember-data', 'ember'], function (exports, _emberData, _ember) {
  exports['default'] = _emberData['default'].Model.extend({
    slug: _emberData['default'].attr('string'),
    dateString: _emberData['default'].attr('string'),
    title: _emberData['default'].attr('string'),
    description: _emberData['default'].attr('string'),
    tags: _emberData['default'].hasMany('tags'),
    link: _emberData['default'].attr('string'),
    coverImage: _emberData['default'].attr('string'),

    idSort: ['id'],
    tagsSorted: _ember['default'].computed.sort('tags', 'idSort')
  });
});
define('kuzi/models/image', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    path: _emberData['default'].attr('string'),
    width: _emberData['default'].attr('number'),
    height: _emberData['default'].attr('number'),
    caption: _emberData['default'].attr('string'),

    app: _emberData['default'].belongsTo('app', { async: true })
  });
});
define('kuzi/models/tag', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    description: _emberData['default'].attr('string'),
    apps: _emberData['default'].hasMany('app', { async: true })
  });
});
define('kuzi/models/video', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    link: _emberData['default'].attr('string'),
    app: _emberData['default'].belongsTo('app', { async: true })
  });
});
define('kuzi/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('kuzi/router', ['exports', 'ember', 'kuzi/config/environment'], function (exports, _ember, _kuziConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _kuziConfigEnvironment['default'].locationType
  });

  exports['default'] = Router.map(function () {
    this.route('apps', function () {
      this.route('view', { path: '/:app_slug' });
    });

    this.route('home', { path: '/' });
    this.route('contact');
    this.route('about', function () {
      this.route('general');
      this.route('experience', function () {
        this.route('view');
      });
    });
  });
});
define('kuzi/routes/about/experience/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      var store = this.get('store');

      return new _ember['default'].RSVP.Promise(function (resolve) {
        store.findAll('tag').then(function () {
          resolve(store.findAll('experience'));
        });
      });
    }
  });
});
define('kuzi/routes/about/experience/view', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('kuzi/routes/about/experience', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend();
});
define('kuzi/routes/about/general', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('kuzi/routes/about/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend();
});
define('kuzi/routes/apps/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      var _this = this;

      return _ember['default'].RSVP.hash({
        tags: new _ember['default'].RSVP.Promise(function (resolve) {
          _this.store.findAll('tag').then(function (tags) {
            _this.store.findAll('app').then(function () {
              var sorted = tags.toArray().sort(function (a, b) {
                return a.get('apps.length') < b.get('apps.length') ? 1 : -1;
              });
              resolve(sorted);
            });
          });
        }),
        applications: new _ember['default'].RSVP.Promise(function (resolve) {
          _this.store.findAll('app').then(function (apps) {
            resolve(apps.toArray().sort(function (a, b) {
              return a.get('added') > b.get('added') ? -1 : 1;
            }));
          });
        })
      });
    }
  });
});
define('kuzi/routes/apps/view', ['exports', 'ember'], function (exports, _ember) {
  var PhotoSwipe = window.PhotoSwipe;
  var PhotoSwipeUI_Default = window.PhotoSwipeUI_Default;
  exports['default'] = _ember['default'].Route.extend({
    _showImages: function _showImages(providedElement) {
      var pswpElement = providedElement || document.querySelectorAll('.pswp')[0],
          items = [],
          model = this.get('controller.model');

      if (!model) {
        return;
      }

      var images = model.get('images');

      images.forEach(function (image) {
        items.push({
          src: image.get('id'),
          w: image.get('width'),
          h: image.get('height'),
          title: image.get('caption')
        });
      });

      // define options (if needed)
      var options = {
        // optionName: 'option value'
        // for example:
        index: 0, // start at first slide
        history: false
      };

      // Initializes and opens PhotoSwipe
      var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
      gallery.init();
    },
    model: function model(params) {
      var _this = this;

      return new _ember['default'].RSVP.Promise(function (resolve) {
        _this.store.findAll('app').then(function () {
          return resolve(_this.store.findRecord('app', params.app_slug));
        });
      });
    },
    actions: {
      showImages: function showImages() {
        var pswpElement = document.querySelectorAll('.pswp')[0];

        if (!pswpElement) {
          this.render('pswp', {
            into: 'application',
            outlet: 'body-direct'
          });

          return _ember['default'].run.scheduleOnce('afterRender', this, '_showImages');
        }

        this._showImages(pswpElement);
      }
    }
  });
});
define('kuzi/routes/apps', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      this.store.findAll('app');
      this.store.findAll('tag');
      this.store.findAll('video');
      this.store.findAll('image');
    }
  });
});
define('kuzi/routes/home', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend();
});
define('kuzi/serializers/app', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].RESTSerializer.extend({
    primaryKey: 'slug'
  });
});
define('kuzi/serializers/experience', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].RESTSerializer.extend({
    primaryKey: 'slug'
  });
});
define('kuzi/serializers/image', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].RESTSerializer.extend({
    primaryKey: 'path'
  });
});
define('kuzi/serializers/tag', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].RESTSerializer.extend({
    primaryKey: 'name'
  });
});
define('kuzi/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('kuzi/services/fastboot', ['exports', 'ember'], function (exports, _ember) {

  var alias = _ember['default'].computed.alias;
  var computed = _ember['default'].computed;

  exports['default'] = _ember['default'].Service.extend({
    cookies: alias('_fastbootInfo.cookies'),
    headers: alias('_fastbootInfo.headers'),
    host: computed(function () {
      return this._fastbootInfo.host();
    }),
    isFastBoot: computed(function () {
      return typeof FastBoot !== 'undefined';
    })
  });
});
/* global FastBoot */
define("kuzi/templates/about/experience/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template("{\"statements\":[[\"openElement\",\"ul\",[]],[\"staticAttr\",\"class\",\"timeline\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],{\"key\":\"id\"},2],[\"closeElement\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"            \"],[\"append\",[\"helper\",[\"tag-display\"],null,{\"model\":[\"get\",[\"tag\"]],\"tagName\":\"span\"}],false],[\"text\",\"\\n\"]],\"locals\":[\"tag\"]},{\"statements\":[[\"text\",\"            \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"cover-container\"],[\"text\",\"\\n              \"],[\"openElement\",\"img\",[]],[\"dynamicAttr\",\"src\",[\"unknown\",[\"experience\",\"coverImage\"]],null],[\"staticAttr\",\"class\",\"card-cover\"],[\"closeElement\"],[\"text\",\"\\n            \"],[\"closeElement\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"openElement\",\"li\",[]],[\"text\",\"\\n      \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"card\"],[\"text\",\"\\n        \"],[\"openElement\",\"header\",[]],[\"openElement\",\"a\",[]],[\"dynamicAttr\",\"href\",[\"unknown\",[\"experience\",\"link\"]],null],[\"staticAttr\",\"target\",\"_blank\"],[\"append\",[\"unknown\",[\"experience\",\"title\"]],false],[\"closeElement\"],[\"closeElement\"],[\"text\",\"\\n        \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"main\"],[\"append\",[\"unknown\",[\"experience\",\"description\"]],false],[\"closeElement\"],[\"text\",\"\\n        \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"bottom\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"experience\",\"coverImage\"]]],null,1],[\"block\",[\"each\"],[[\"get\",[\"experience\",\"tagsSorted\"]]],null,0],[\"text\",\"          \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"time-info\"],[\"append\",[\"unknown\",[\"experience\",\"dateString\"]],false],[\"closeElement\"],[\"text\",\"\\n        \"],[\"closeElement\"],[\"text\",\"\\n      \"],[\"closeElement\"],[\"text\",\"\\n    \"],[\"closeElement\"],[\"text\",\"\\n\"]],\"locals\":[\"experience\"]}],\"meta\":{\"moduleName\":\"kuzi/templates/about/experience/index.hbs\"}}");
});
define("kuzi/templates/about/experience/view", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template("{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"meta\":{\"moduleName\":\"kuzi/templates/about/experience/view.hbs\"}}");
});
define("kuzi/templates/about/experience", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template("{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"meta\":{\"moduleName\":\"kuzi/templates/about/experience.hbs\"}}");
});
define("kuzi/templates/about/general", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template("{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"meta\":{\"moduleName\":\"kuzi/templates/about/general.hbs\"}}");
});
define("kuzi/templates/about/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template("{\"statements\":[[\"block\",[\"about-container\"],null,null,2]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"about-bottom\"],[\"text\",\"\\n      \"],[\"openElement\",\"header\",[]],[\"text\",\"volunteer experience\"],[\"closeElement\"],[\"text\",\"\\n    \"],[\"closeElement\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"about-top\"],[\"text\",\"\\n      \"],[\"openElement\",\"header\",[]],[\"text\",\"general\"],[\"closeElement\"],[\"text\",\"\\n    \"],[\"closeElement\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"link-to\"],[\"about.general\"],null,1],[\"text\",\"  \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"about-split\"],[\"text\",\"\\n    \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"circle\"],[\"text\",\"\\n      \"],[\"openElement\",\"span\",[]],[\"staticAttr\",\"class\",\"text\"],[\"text\",\"choose\"],[\"closeElement\"],[\"text\",\"\\n    \"],[\"closeElement\"],[\"text\",\"\\n    \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"arrow\"],[\"text\",\"\\n      \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"arrow-concrete\"],[\"closeElement\"],[\"text\",\"\\n    \"],[\"closeElement\"],[\"text\",\"\\n  \"],[\"closeElement\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"about.experience\"],null,0]],\"locals\":[]}],\"meta\":{\"moduleName\":\"kuzi/templates/about/index.hbs\"}}");
});
define("kuzi/templates/about", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template("{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"meta\":{\"moduleName\":\"kuzi/templates/about.hbs\"}}");
});
define("kuzi/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template("{\"statements\":[[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"icon-bar four-up noselect\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"home\"],{\"class\":\"item\"},3],[\"block\",[\"link-to\"],[\"about\"],{\"class\":\"item\"},2],[\"block\",[\"link-to\"],[\"apps\"],{\"class\":\"item\"},1],[\"block\",[\"link-to\"],[\"contact\"],{\"class\":\"item\"},0],[\"closeElement\"],[\"text\",\"\\n\\n\"],[\"openElement\",\"main\",[]],[\"staticAttr\",\"class\",\"row full\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"outlet\"],[\"body-child\"],null],false],[\"text\",\"\\n  \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"],[\"closeElement\"],[\"text\",\"\\n\\n\"],[\"openElement\",\"footer\",[]],[\"staticAttr\",\"class\",\"main\"],[\"text\",\"\\n  \"],[\"openElement\",\"ul\",[]],[\"text\",\"\\n    \"],[\"openElement\",\"li\",[]],[\"openElement\",\"a\",[]],[\"staticAttr\",\"href\",\"https://stackoverflow.com/cv/danielkmak\"],[\"staticAttr\",\"target\",\"_blank\"],[\"staticAttr\",\"class\",\"noselect\"],[\"text\",\"so developer cv \"],[\"openElement\",\"i\",[]],[\"staticAttr\",\"class\",\"fa fa-external-link-square\"],[\"closeElement\"],[\"closeElement\"],[\"closeElement\"],[\"text\",\"\\n    \"],[\"openElement\",\"li\",[]],[\"openElement\",\"a\",[]],[\"staticAttr\",\"href\",\"https://linkedin.com/in/kmakdaniel\"],[\"staticAttr\",\"target\",\"_blank\"],[\"staticAttr\",\"class\",\"noselect\"],[\"text\",\"linkedin \"],[\"openElement\",\"i\",[]],[\"staticAttr\",\"class\",\"fa fa-external-link-square\"],[\"closeElement\"],[\"closeElement\"],[\"closeElement\"],[\"text\",\"\\n  \"],[\"closeElement\"],[\"text\",\"\\n\"],[\"closeElement\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"outlet\"],[\"body-direct\"],null],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"append\",[\"helper\",[\"unbound\"],[[\"helper\",[\"fa-icon\"],[\"envelope-o\"],null]],null],false],[\"text\",\"\\n    \"],[\"openElement\",\"label\",[]],[\"text\",\"Contact\"],[\"closeElement\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"append\",[\"helper\",[\"unbound\"],[[\"helper\",[\"fa-icon\"],[\"desktop\"],null]],null],false],[\"text\",\"\\n    \"],[\"openElement\",\"label\",[]],[\"text\",\"Projects\"],[\"closeElement\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"append\",[\"helper\",[\"unbound\"],[[\"helper\",[\"fa-icon\"],[\"user\"],null]],null],false],[\"text\",\"\\n    \"],[\"openElement\",\"label\",[]],[\"text\",\"About me\"],[\"closeElement\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"append\",[\"helper\",[\"unbound\"],[[\"helper\",[\"fa-icon\"],[\"home\"],null]],null],false],[\"text\",\"\\n    \"],[\"openElement\",\"label\",[]],[\"text\",\"Home\"],[\"closeElement\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"meta\":{\"moduleName\":\"kuzi/templates/application.hbs\"}}");
});
define("kuzi/templates/apps/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template("{\"statements\":[[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"row full\"],[\"text\",\"\\n  \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"large-12 columns intro-text apps\"],[\"text\",\"\\n    \"],[\"openElement\",\"p\",[]],[\"text\",\"\\n      \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"large-6 large-offset-3 columns\"],[\"text\",\"\\n        \"],[\"openElement\",\"label\",[]],[\"text\",\"\\n          \"],[\"append\",[\"helper\",[\"input\"],null,{\"value\":[\"get\",[\"search\"]],\"type\":\"text\",\"placeholder\":\"search by project name...\"}],false],[\"text\",\"\\n        \"],[\"closeElement\"],[\"text\",\"\\n      \"],[\"closeElement\"],[\"text\",\"\\n      \"],[\"openElement\",\"hr\",[]],[\"closeElement\"],[\"text\",\"\\n      \"],[\"openElement\",\"ul\",[]],[\"staticAttr\",\"class\",\"tags noselect\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\",\"tags\"]]],{\"key\":\"id\"},8],[\"text\",\"      \"],[\"closeElement\"],[\"text\",\"\\n      \"],[\"openElement\",\"hr\",[]],[\"closeElement\"],[\"text\",\"\\n      \"],[\"openElement\",\"ul\",[]],[\"staticAttr\",\"class\",\"applications\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"filteredApps\"]]],{\"key\":\"id\"},6],[\"text\",\"      \"],[\"closeElement\"],[\"text\",\"\\n    \"],[\"closeElement\"],[\"text\",\"\\n  \"],[\"closeElement\"],[\"text\",\"\\n\"],[\"closeElement\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"                    \"],[\"append\",[\"helper\",[\"tag-display\"],null,{\"model\":[\"get\",[\"tag\"]],\"title\":[\"get\",[\"tag\",\"description\"]],\"active\":[\"get\",[\"tag\",\"active\"]]}],false],[\"text\",\"\\n\"]],\"locals\":[\"tag\"]},{\"statements\":[[\"append\",[\"helper\",[\"highlight-match\"],null,{\"bold\":[\"get\",[\"search\"]],\"first\":[\"get\",[\"app\",\"name\"]]}],false]],\"locals\":[]},{\"statements\":[[\"text\",\"                  \"],[\"append\",[\"helper\",[\"animated-caption\"],null,{\"added\":[\"get\",[\"app\",\"added\"]],\"class\":\"image-caption\"}],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"                \"],[\"openElement\",\"img\",[]],[\"dynamicAttr\",\"src\",[\"concat\",[[\"unknown\",[\"app\",\"smallImage\"]]]]],[\"closeElement\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"app\",\"added\"]]],null,2]],\"locals\":[]},{\"statements\":[[\"block\",[\"link-to\"],[\"apps.view\",[\"get\",[\"app\",\"id\"]]],null,3]],\"locals\":[]},{\"statements\":[[\"text\",\"              \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"ribbon ribbon-black\"],[\"text\",\"\\n                \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"banner\"],[\"text\",\"\\n                  \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"text\"],[\"text\",\"LATEST \"],[\"openElement\",\"i\",[]],[\"staticAttr\",\"class\",\"fa fa-diamond topped-image\"],[\"closeElement\"],[\"closeElement\"],[\"text\",\"\\n                \"],[\"closeElement\"],[\"text\",\"\\n              \"],[\"closeElement\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"          \"],[\"openElement\",\"li\",[]],[\"staticAttr\",\"class\",\"see-through-bordered\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"app\",\"latest\"]]],null,5],[\"block\",[\"if\"],[[\"get\",[\"app\",\"smallImage\"]]],null,4],[\"text\",\"            \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"body\"],[\"text\",\"\\n              \"],[\"openElement\",\"header\",[]],[\"block\",[\"link-to\"],[\"apps.view\",[\"get\",[\"app\",\"id\"]]],{\"title\":\"application's name\"},1],[\"closeElement\"],[\"text\",\"\\n              \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"description\"],[\"staticAttr\",\"title\",\"application's description\"],[\"append\",[\"unknown\",[\"app\",\"description\"]],false],[\"closeElement\"],[\"text\",\"\\n              \"],[\"openElement\",\"footer\",[]],[\"text\",\"\\n                \"],[\"openElement\",\"ul\",[]],[\"staticAttr\",\"class\",\"noselect\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"app\",\"tagsSorted\"]]],{\"key\":\"id\"},0],[\"text\",\"                \"],[\"closeElement\"],[\"text\",\"\\n              \"],[\"closeElement\"],[\"text\",\"\\n            \"],[\"closeElement\"],[\"text\",\"\\n          \"],[\"closeElement\"],[\"text\",\"\\n\"]],\"locals\":[\"app\"]},{\"statements\":[[\"text\",\"            \"],[\"openElement\",\"li\",[]],[\"dynamicAttr\",\"class\",[\"concat\",[\"label cursor-pointer see-through-bordered \",[\"helper\",[\"if\"],[[\"get\",[\"tag\",\"active\"]],\"success\"],null]]]],[\"dynamicAttr\",\"title\",[\"concat\",[\"show projects tagged \\\"\",[\"unknown\",[\"tag\",\"id\"]],\"\\\"\"]]],[\"modifier\",[\"action\"],[[\"get\",[\"\"]],\"selectTag\",[\"get\",[\"tag\"]]]],[\"text\",\"\\n              \"],[\"append\",[\"unknown\",[\"tag\",\"id\"]],false],[\"text\",\"\\n              \"],[\"openElement\",\"span\",[]],[\"staticAttr\",\"class\",\"apps-count\"],[\"staticAttr\",\"title\",\"number of projects linked with this tag\"],[\"append\",[\"unknown\",[\"tag\",\"apps\",\"length\"]],false],[\"closeElement\"],[\"text\",\"\\n            \"],[\"closeElement\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"tag\",\"apps\",\"length\"]]],null,7]],\"locals\":[\"tag\"]}],\"meta\":{\"moduleName\":\"kuzi/templates/apps/index.hbs\"}}");
});
define("kuzi/templates/apps/view", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template("{\"statements\":[[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"large-9 columns margin-auto below-menu app-view\"],[\"text\",\"\\n  \"],[\"openElement\",\"header\",[]],[\"staticAttr\",\"class\",\"font-size-44 text-left\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"apps\"],null,9],[\"text\",\"    \"],[\"append\",[\"unknown\",[\"model\",\"name\"]],false],[\"text\",\"\\n    \"],[\"openElement\",\"span\",[]],[\"staticAttr\",\"class\",\"right gray-3 see-through-bordered\"],[\"append\",[\"helper\",[\"time-ago\"],null,{\"time\":[\"get\",[\"model\",\"added\"]],\"title\":\"added\"}],false],[\"closeElement\"],[\"text\",\"\\n  \"],[\"closeElement\"],[\"text\",\"\\n  \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"panel-contents\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"videoOrImages\"]]],null,8],[\"text\",\"    \"],[\"openElement\",\"ul\",[]],[\"staticAttr\",\"class\",\"inline-bottom\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\",\"tagsSorted\"]]],{\"key\":\"id\"},1],[\"text\",\"    \"],[\"closeElement\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"description\"]]],null,0],[\"text\",\"  \"],[\"closeElement\"],[\"text\",\"\\n\"],[\"closeElement\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"      \"],[\"openElement\",\"span\",[]],[\"staticAttr\",\"class\",\"gray-3 text-left see-through-bordered\"],[\"text\",\"\\n        \"],[\"append\",[\"unknown\",[\"model\",\"description\"]],false],[\"text\",\"\\n      \"],[\"closeElement\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"append\",[\"helper\",[\"tag-display\"],null,{\"model\":[\"get\",[\"tag\"]]}],false],[\"text\",\"\\n\"]],\"locals\":[\"tag\"]},{\"statements\":[[\"text\",\"          \"],[\"openElement\",\"li\",[]],[\"text\",\"\\n            \"],[\"openElement\",\"a\",[]],[\"dynamicAttr\",\"href\",[\"unknown\",[\"model\",\"link\"]],null],[\"staticAttr\",\"target\",\"_blank\"],[\"staticAttr\",\"title\",\"visit page in new tab\"],[\"staticAttr\",\"class\",\"button detailed-button yt-tile see-through-bordered\"],[\"text\",\"\\n              \"],[\"openElement\",\"i\",[]],[\"staticAttr\",\"class\",\"fa fa-external-link-square\"],[\"closeElement\"],[\"text\",\"\\n            \"],[\"closeElement\"],[\"text\",\"\\n          \"],[\"closeElement\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"                  \"],[\"openElement\",\"img\",[]],[\"dynamicAttr\",\"src\",[\"unknown\",[\"img\",\"id\"]],null],[\"closeElement\"],[\"text\",\"\\n\"]],\"locals\":[\"img\"]},{\"statements\":[[\"text\",\"          \"],[\"openElement\",\"li\",[]],[\"text\",\"\\n            \"],[\"openElement\",\"button\",[]],[\"staticAttr\",\"class\",\"detailed-button see-through-bordered\"],[\"staticAttr\",\"title\",\"show images\"],[\"modifier\",[\"action\"],[[\"get\",[\"\"]],\"showImages\"]],[\"text\",\"\\n              \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"tile-gallery\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\",\"first4Images\"]]],{\"key\":\"id\"},3],[\"text\",\"              \"],[\"closeElement\"],[\"text\",\"\\n              \"],[\"openElement\",\"i\",[]],[\"staticAttr\",\"class\",\"fa fa-camera-retro\"],[\"closeElement\"],[\"text\",\"\\n            \"],[\"closeElement\"],[\"text\",\"\\n          \"],[\"closeElement\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"              \"],[\"openElement\",\"a\",[]],[\"staticAttr\",\"class\",\"button detailed-button yt-tile see-through-bordered\"],[\"staticAttr\",\"title\",\"show video\"],[\"dynamicAttr\",\"href\",[\"concat\",[\"https://www.youtube.com/watch?v=\",[\"unknown\",[\"model\",\"video\",\"id\"]]]]],[\"staticAttr\",\"target\",\"_blank\"],[\"text\",\"\\n                \"],[\"openElement\",\"img\",[]],[\"dynamicAttr\",\"src\",[\"concat\",[\"https://i1.ytimg.com/vi/\",[\"unknown\",[\"model\",\"video\",\"id\"]],\"/default.jpg\"]]],[\"closeElement\"],[\"text\",\"\\n                \"],[\"openElement\",\"i\",[]],[\"staticAttr\",\"class\",\"fa fa-youtube\"],[\"closeElement\"],[\"text\",\"\\n              \"],[\"closeElement\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"              \"],[\"openElement\",\"iframe\",[]],[\"staticAttr\",\"width\",\"60%\"],[\"staticAttr\",\"height\",\"440px\"],[\"dynamicAttr\",\"src\",[\"concat\",[\"https://www.youtube.com/embed/\",[\"unknown\",[\"model\",\"video\",\"id\"]]]]],[\"staticAttr\",\"frameborder\",\"0\"],[\"staticAttr\",\"allowfullscreen\",\"\"],[\"closeElement\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"showVideo\"]]],null,6,5]],\"locals\":[]},{\"statements\":[[\"text\",\"      \"],[\"openElement\",\"ul\",[]],[\"staticAttr\",\"class\",\"tab-switches\"],[\"text\",\"\\n        \"],[\"openElement\",\"li\",[]],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"video\"]]],null,7],[\"text\",\"        \"],[\"closeElement\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"images\"]]],null,4],[\"block\",[\"if\"],[[\"get\",[\"model\",\"link\"]]],null,2],[\"text\",\"      \"],[\"closeElement\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"openElement\",\"i\",[]],[\"staticAttr\",\"class\",\"fa fa-arrow-circle-o-left\"],[\"closeElement\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"meta\":{\"moduleName\":\"kuzi/templates/apps/view.hbs\"}}");
});
define("kuzi/templates/apps", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template("{\"statements\":[[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"background-image\"],[\"closeElement\"],[\"text\",\"\\n\\n\"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"dusted opacity-0 fade-out\"],[\"text\",\"\\n  \"],[\"openElement\",\"img\",[]],[\"staticAttr\",\"src\",\"/img/tw.gif\"],[\"closeElement\"],[\"text\",\"\\n  \"],[\"openElement\",\"img\",[]],[\"staticAttr\",\"src\",\"/img/tw.gif\"],[\"closeElement\"],[\"text\",\"\\n  \"],[\"openElement\",\"img\",[]],[\"staticAttr\",\"src\",\"/img/tw.gif\"],[\"closeElement\"],[\"text\",\"\\n\"],[\"closeElement\"],[\"text\",\"\\n\\n\"],[\"openElement\",\"section\",[]],[\"staticAttr\",\"class\",\"text-center over-image\"],[\"text\",\"\\n  \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"],[\"closeElement\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"meta\":{\"moduleName\":\"kuzi/templates/apps.hbs\"}}");
});
define("kuzi/templates/components/about-container", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template("{\"statements\":[[\"yield\",\"default\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[],\"meta\":{\"moduleName\":\"kuzi/templates/components/about-container.hbs\"}}");
});
define("kuzi/templates/components/animated-caption", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template("{\"statements\":[[\"openElement\",\"i\",[]],[\"dynamicAttr\",\"class\",[\"concat\",[\"fa fa-eye \",[\"helper\",[\"if\"],[[\"get\",[\"showTemplate\"]],\"visible\",\"hidden\"],null]]]],[\"closeElement\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"showTime\"]]],null,0]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"append\",[\"helper\",[\"time-ago\"],null,{\"time\":[\"get\",[\"added\"]],\"title\":\"updated\"}],false],[\"text\",\"\\n\"]],\"locals\":[]}],\"meta\":{\"moduleName\":\"kuzi/templates/components/animated-caption.hbs\"}}");
});
define("kuzi/templates/components/expanding-description", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template("{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"short\"]]],null,6,1],[\"append\",[\"helper\",[\"if\"],[[\"get\",[\"dash\"]],\"&nbsp;-&nbsp;\"],null],true],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"if\"],[[\"get\",[\"additional\"]],[\"get\",[\"additional\"]]],null],false],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"comma\"]]],null,0]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"openElement\",\"span\",[]],[\"staticAttr\",\"class\",\"fight-space\"],[\"text\",\",\"],[\"closeElement\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"yield\",\"default\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"openElement\",\"span\",[]],[\"staticAttr\",\"class\",\"fight-space\"],[\"append\",[\"helper\",[\"if\"],[[\"get\",[\"shortened\"]],[\"get\",[\"shortened\"]],[\"get\",[\"short\"]]],null],true],[\"append\",[\"helper\",[\"if\"],[[\"get\",[\"dots\"]],[\"get\",[\"dotsDisplay\"]]],null],false],[\"closeElement\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"      \"],[\"openElement\",\"span\",[]],[\"staticAttr\",\"class\",\"fight-space\"],[\"yield\",\"default\"],[\"closeElement\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"      \"],[\"openElement\",\"span\",[]],[\"staticAttr\",\"class\",\"fight-space\"],[\"append\",[\"unknown\",[\"short\"]],false],[\"closeElement\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"maxLength\"]]],null,4,3]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"expanded\"]]],null,5,2]],\"locals\":[]}],\"meta\":{\"moduleName\":\"kuzi/templates/components/expanding-description.hbs\"}}");
});
define("kuzi/templates/components/highlight-match", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template("{\"statements\":[[\"append\",[\"unknown\",[\"display\"]],true],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"third\"]]],null,0]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"openElement\",\"i\",[]],[\"text\",\"(\"],[\"append\",[\"unknown\",[\"secondaryDisplay\"]],true],[\"text\",\")\"],[\"closeElement\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"meta\":{\"moduleName\":\"kuzi/templates/components/highlight-match.hbs\"}}");
});
define("kuzi/templates/components/particles-js", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template("{\"statements\":[[\"yield\",\"default\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[],\"meta\":{\"moduleName\":\"kuzi/templates/components/particles-js.hbs\"}}");
});
define("kuzi/templates/components/tag-display", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template("{\"statements\":[[\"append\",[\"unknown\",[\"model\",\"id\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"meta\":{\"moduleName\":\"kuzi/templates/components/tag-display.hbs\"}}");
});
define("kuzi/templates/components/time-ago", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template("{\"statements\":[[\"yield\",\"default\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[],\"meta\":{\"moduleName\":\"kuzi/templates/components/time-ago.hbs\"}}");
});
define("kuzi/templates/components/yt-video", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template("{\"statements\":[[\"openElement\",\"iframe\",[]],[\"dynamicAttr\",\"id\",[\"concat\",[\"ytplayer-\",[\"unknown\",[\"model\",\"id\"]]]]],[\"staticAttr\",\"frameborder\",\"0\"],[\"staticAttr\",\"height\",\"100%\"],[\"staticAttr\",\"width\",\"100%\"],[\"dynamicAttr\",\"src\",[\"concat\",[\"https://www.youtube-nocookie.com/embed/\",[\"unknown\",[\"model\",\"id\"]],\"?autoplay=1&controls=0&showinfo=0&autohide=1&enablejsapi=1\"]]],[\"text\",\"\\n\"],[\"closeElement\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"meta\":{\"moduleName\":\"kuzi/templates/components/yt-video.hbs\"}}");
});
define("kuzi/templates/contact", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template("{\"statements\":[[\"openElement\",\"section\",[]],[\"staticAttr\",\"class\",\"contact text-center\"],[\"text\",\"\\n  \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"row full\"],[\"text\",\"\\n    \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"large-12 columns intro-text\"],[\"text\",\"\\n      \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"bw-box\"],[\"text\",\"\\n        \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"main\"],[\"text\",\"HIRE@DANIELKMAK.COM\"],[\"closeElement\"],[\"text\",\"\\n        \"],[\"openElement\",\"footer\",[]],[\"text\",\"HIRE ME\"],[\"closeElement\"],[\"text\",\"\\n      \"],[\"closeElement\"],[\"text\",\"\\n    \"],[\"closeElement\"],[\"text\",\"\\n  \"],[\"closeElement\"],[\"text\",\"\\n\"],[\"closeElement\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"meta\":{\"moduleName\":\"kuzi/templates/contact.hbs\"}}");
});
define("kuzi/templates/home", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template("{\"statements\":[[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"hero\"],[\"text\",\"\\n  \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"row full home\"],[\"text\",\"\\n    \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"large-12 columns intro-text noselect z-index-particles\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"particles-js\"],null,{\"id\":\"particles-js\"}],false],[\"text\",\"\\n      \"],[\"openElement\",\"p\",[]],[\"staticAttr\",\"class\",\"home-p\"],[\"text\",\"\\n        \"],[\"openElement\",\"a\",[]],[\"staticAttr\",\"href\",\"//stackoverflow.com/users/2166409/daniel\"],[\"staticAttr\",\"class\",\"so-link\"],[\"staticAttr\",\"target\",\"_blank\"],[\"text\",\"\\n          \"],[\"openElement\",\"img\",[]],[\"dynamicAttr\",\"src\",[\"concat\",[\"//stackoverflow.com/users/flair/2166409.png?theme=\",[\"helper\",[\"if\"],[[\"get\",[\"heroHovered\"]],\"dark\",\"clean\"],null]]]],[\"staticAttr\",\"title\",\"profile for Daniel at Stack Overflow, Q&A for professional and enthusiast programmers\"],[\"closeElement\"],[\"text\",\"\\n        \"],[\"closeElement\"],[\"text\",\"\\n        \"],[\"openElement\",\"em\",[]],[\"staticAttr\",\"class\",\"me-equals\"],[\"text\",\"an aspiring web engineer.\"],[\"closeElement\"],[\"text\",\"\\n      \"],[\"closeElement\"],[\"text\",\"\\n    \"],[\"closeElement\"],[\"text\",\"\\n  \"],[\"closeElement\"],[\"text\",\"\\n\"],[\"closeElement\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"meta\":{\"moduleName\":\"kuzi/templates/home.hbs\"}}");
});
define("kuzi/templates/pswp", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template("{\"statements\":[[\"comment\",\" Root element of PhotoSwipe. Must have class pswp. \"],[\"text\",\"\\n\"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"pswp\"],[\"staticAttr\",\"tabindex\",\"-1\"],[\"staticAttr\",\"role\",\"dialog\"],[\"staticAttr\",\"aria-hidden\",\"true\"],[\"text\",\"\\n\\n    \"],[\"comment\",\" Background of PhotoSwipe.\\n         It's a separate element as animating opacity is faster than rgba(). \"],[\"text\",\"\\n    \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"pswp__bg\"],[\"closeElement\"],[\"text\",\"\\n\\n    \"],[\"comment\",\" Slides wrapper with overflow:hidden. \"],[\"text\",\"\\n    \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"pswp__scroll-wrap\"],[\"text\",\"\\n\\n        \"],[\"comment\",\" Container that holds slides.\\n            PhotoSwipe keeps only 3 of them in the DOM to save memory.\\n            Don't modify these 3 pswp__item elements, data is added later on. \"],[\"text\",\"\\n        \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"pswp__container\"],[\"text\",\"\\n            \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"pswp__item\"],[\"closeElement\"],[\"text\",\"\\n            \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"pswp__item\"],[\"closeElement\"],[\"text\",\"\\n            \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"pswp__item\"],[\"closeElement\"],[\"text\",\"\\n        \"],[\"closeElement\"],[\"text\",\"\\n\\n        \"],[\"comment\",\" Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. \"],[\"text\",\"\\n        \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"pswp__ui pswp__ui--hidden\"],[\"text\",\"\\n\\n            \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"pswp__top-bar\"],[\"text\",\"\\n\\n                \"],[\"comment\",\"  Controls are self-explanatory. Order can be changed. \"],[\"text\",\"\\n\\n                \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"pswp__counter\"],[\"closeElement\"],[\"text\",\"\\n\\n                \"],[\"openElement\",\"button\",[]],[\"staticAttr\",\"class\",\"pswp__button pswp__button--close\"],[\"staticAttr\",\"title\",\"Close (Esc)\"],[\"closeElement\"],[\"text\",\"\\n\\n                \"],[\"openElement\",\"button\",[]],[\"staticAttr\",\"class\",\"pswp__button pswp__button--share\"],[\"staticAttr\",\"title\",\"Share\"],[\"closeElement\"],[\"text\",\"\\n\\n                \"],[\"openElement\",\"button\",[]],[\"staticAttr\",\"class\",\"pswp__button pswp__button--fs\"],[\"staticAttr\",\"title\",\"Toggle fullscreen\"],[\"closeElement\"],[\"text\",\"\\n\\n                \"],[\"openElement\",\"button\",[]],[\"staticAttr\",\"class\",\"pswp__button pswp__button--zoom\"],[\"staticAttr\",\"title\",\"Zoom in/out\"],[\"closeElement\"],[\"text\",\"\\n\\n                \"],[\"comment\",\" Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR \"],[\"text\",\"\\n                \"],[\"comment\",\" element will get class pswp__preloader--active when preloader is running \"],[\"text\",\"\\n                \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"pswp__preloader\"],[\"text\",\"\\n                    \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"pswp__preloader__icn\"],[\"text\",\"\\n                      \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"pswp__preloader__cut\"],[\"text\",\"\\n                        \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"pswp__preloader__donut\"],[\"closeElement\"],[\"text\",\"\\n                      \"],[\"closeElement\"],[\"text\",\"\\n                    \"],[\"closeElement\"],[\"text\",\"\\n                \"],[\"closeElement\"],[\"text\",\"\\n            \"],[\"closeElement\"],[\"text\",\"\\n\\n            \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"pswp__share-modal pswp__share-modal--hidden pswp__single-tap\"],[\"text\",\"\\n                \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"pswp__share-tooltip\"],[\"closeElement\"],[\"text\",\"\\n            \"],[\"closeElement\"],[\"text\",\"\\n\\n            \"],[\"openElement\",\"button\",[]],[\"staticAttr\",\"class\",\"pswp__button pswp__button--arrow--left\"],[\"staticAttr\",\"title\",\"Previous (arrow left)\"],[\"text\",\"\\n            \"],[\"closeElement\"],[\"text\",\"\\n\\n            \"],[\"openElement\",\"button\",[]],[\"staticAttr\",\"class\",\"pswp__button pswp__button--arrow--right\"],[\"staticAttr\",\"title\",\"Next (arrow right)\"],[\"text\",\"\\n            \"],[\"closeElement\"],[\"text\",\"\\n\\n            \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"pswp__caption\"],[\"text\",\"\\n                \"],[\"openElement\",\"div\",[]],[\"staticAttr\",\"class\",\"pswp__caption__center\"],[\"closeElement\"],[\"text\",\"\\n            \"],[\"closeElement\"],[\"text\",\"\\n\\n        \"],[\"closeElement\"],[\"text\",\"\\n\\n    \"],[\"closeElement\"],[\"text\",\"\\n\\n\"],[\"closeElement\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"meta\":{\"moduleName\":\"kuzi/templates/pswp.hbs\"}}");
});
define('kuzi/transitions', ['exports'], function (exports) {
  exports['default'] = function () {
    this.transition(this.fromRoute('shome'), this.toRoute('contact'), this.use('toLeft'), this.reverse('toRight'));
  };
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('kuzi/config/environment', ['ember'], function(Ember) {
  var exports = {'default': {"modulePrefix":"kuzi","environment":"production","baseURL":"/","locationType":"hash","EmberENV":{"FEATURES":{},"EXTEND_PROTOTYPES":{"Date":false}},"APP":{"name":"kuzi","version":"0.0.0+d5c7f4b8","autoboot":false},"sassOptions":{"includePaths":["bower_components/foundation/scss"]},"exportApplicationGlobal":false}};Object.defineProperty(exports, '__esModule', {value: true});return exports;
});

/* jshint ignore:end */

/* jshint ignore:start */


define('~fastboot/app-factory', ['kuzi/app', 'kuzi/config/environment'], function(App, config) {
  App = App['default'];
  config = config['default'];

  return {
    'default': function() {
      return App.create(config.APP);
    }
  };
});


/* jshint ignore:end */
