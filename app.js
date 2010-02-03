/**
 * Simple application definition which sets up a global keymap to navigate between tabs
 */
var app = Ext.apply(new Ext.util.Observable(), {
  /**
   * Launches the application, sets up the keymap
   */
  launch: function() {
    /**
     * @property navigateOnNextKey
     * @type Boolean
     * Stores whether or not we should navigate on the next appropriate keypress
     */
    this.navigateOnNextKey = false;
    
    /**
     * @property tabs
     * @type Ext.TabPanel
     * Central tab panel which we can navigate using the keyboard
     */
    this.tabs = new Ext.TabPanel({
      items: [
        {
          id   : 'first',
          title: 'First tab',
          html : 'First tab content'
        },
        {
          id   : 'second',
          title: 'Second tab',
          html : 'Second tab content'
        },
        {
          id   : 'third',
          title: 'Third tab',
          html : 'Third tab content'
        }
      ],
      activeItem: 'first'
    });
    
    new Ext.Viewport({
      layout: 'fit',
      items : [this.tabs]
    });
    
    this.initKeyMap();
  },
  
  /**
   * Sets up a global KeyMap to switch between our tabs
   */
  initKeyMap: function() {
    //listen for presses to the 'g' key, activate the 2-step key navigation for 2 seconds
    this.keymap = new Ext.KeyMap(document, {
      key  : 'g',
      scope: this,
      fn   : function() {
        if (Ext.fly(document.activeElement).dom.type != 'text') {
          this.navigateOnNextKey = true;
        
          (function() {
            this.navigateOnNextKey = false;
          }).defer(2000, this);
        }
      }
    });
    
    //mapping of key => tab ID
    var navKeys = {
      'f': 'first',
      's': 'second',
      't': 'third'
    };
    
    //add a binding for each of our shortcut keys
    Ext.iterate(navKeys, function(key, tabId) {
      this.keymap.addBinding({
        key  : key,
        scope: this,
        fn   : function() {
          if (this.navigateOnNextKey) {
            this.tabs.setActiveTab(tabId);
            this.navigateOnNextKey = false;
          }
        }
      });
    }, this);
  }
});

Ext.onReady(app.launch, app);