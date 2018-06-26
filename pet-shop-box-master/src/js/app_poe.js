var docId = -1;
var texto;
var abi;
App = {
    web3Provider: null,
    contracts: {},
  
    init: function() {
      input = document.getElementById('files').addEventListener('change', App.readFile, false);
      return App.initWeb3();
    },
  
    initWeb3: function() {
      // Is there an injected web3 instance?
      if (typeof web3 !== 'undefined') {
        App.web3Provider = web3.currentProvider;
      } else {
        // If no injected web3 instance is detected, fall back to Ganache
        App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      }
      web3 = new Web3(App.web3Provider);
  
      return App.initContract();
    },
  
    initContract: function() {
      $.getJSON('ProofOfExistence.json', function(data) {
        // Get the necessary contract artifact file and instantiate it with truffle-contract
        var POEArtifact = data;
        App.contracts.ProofOfExistence = TruffleContract(POEArtifact);
        abi = data["abi"];
        // Set the provider for our contract
        App.contracts.ProofOfExistence.setProvider(App.web3Provider);
      });
  
      return App.bindEvents();
    },
  
    bindEvents: function() {
      $(document).on('click', '#btnGen', App.handleAdopt);
    },
    readFile: function(evt) {
      var file = evt.target.files[0];
      App.fileHash( file, function(x){
        texto = x;
        console.log(texto);
      });
    },
    fileHash: function(file, callback) {
      var reader = new FileReader();
      reader.onload = function(e){
        var hash = e.target.result;
        callback(hash);
      }
        
      reader.readAsBinaryString( file );
    },
    handleAdopt: function(event) {
      event.preventDefault();
      //var hash = "ASDASDJKAS";
    
      
      var poeInstance;
      web3.eth.getAccounts(function(error, accounts) {
        if (error) {
          console.log(error);
        }
        var account = accounts[0];
        
        App.contracts.ProofOfExistence.deployed().then(function(instance) {
          poeInstance = instance;
          // Execute adopt as a transaction by sending account
          return poeInstance.registerDoc(texto, {from: account});
        }).then(function(obj) {
          App.contracts.ProofOfExistence.deployed().then(function(instance) {
            poeInstance = instance;
            return poeInstance.getId();
          }).then(function(id){
            console.log(id);
          document.getElementById('lblId').innerHTML = "ID: " + id;
          })
        }).catch(function(err) {
          console.log(err.message);
        });
      });
    }
  };
  
  $(function() {
    $(window).load(function() {
      App.init();
    });
  });
  