App = {
    web3Provider: null,
    contracts: {},
    
    init: function() {  
      return App.initWeb3();
    },
  
    initWeb3: function() {
      /*
       * Replace me...
       */
  
      return App.initContract();
    },
  
    initContract: function() {
      /*
       * Replace me...
       */
  
      return App.bindEvents();
    },
  
    bindEvents: function() {
      $(document).on('click', '#btnGen', App.handleGen);
    },
  
    markAdopted: function(adopters, account) {
      /*
       * Replace me...
       */
    },
  
    handleGen: function(event) {
      event.preventDefault();
      var template = $('#template');

      var fileInput = $('#files');

      if (!window.FileReader) {
          alert('Your browser is not supported')
      }
      var input = fileInput.get(0);
      /*
      console.log(template.find('#files'));
      // Create a reader object
      var reader = new FileReader();
      if (input.files.length) {
          var textFile = input.files[0];
          reader.readAsText(textFile);
          //$(reader).on('load', processFile);
      } else {
          alert('Please upload a file before continuing')
      } 
      */

      var ID = 3;
      var hash = hash_func("ASDASDasdasdqwidoqiwje123123");
      

  },
  processFile: function (e) {
    var file = e.target.result,
        results;
    if (file && file.length) {
        results = file.split("\n");
        console.log(results)
    }

      var template = $('#template');
      //template.find('#hash').text("hash:" + results);
      /*
       * Replace me...
       */
  },

    handleFile: function(event) {
        
    },
    hash_func: function(text) {
      var hash = 0;
      if (text.length == 0) return hash;
      for (i = 0; i < text.length; i++) {
        char = text.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash;
      }
      return hash;
    }
  };
  
  $(function() {
    $(window).load(function() {
      App.init();
    });
  });
  