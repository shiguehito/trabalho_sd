var i = 0;
var abi;
var texto;
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
    initContract: function() {
      $.getJSON('ProofOfExistence.json', function(data) {
        // Get the necessary contract artifact file and instantiate it with truffle-contract
        var POEArtifact = data;        
        abi = data["abi"];
        App.contracts.ProofOfExistence = TruffleContract(POEArtifact);
      
        // Set the provider for our contract
        App.contracts.ProofOfExistence.setProvider(App.web3Provider);
      
        // Use our contract to retrieve and mark the adopted pets
        //return App.markAdopted();
      });
  
      return App.bindEvents();
    },
  
    bindEvents: function() {
      $(document).on('click', '#btnComp', App.markAdopted);
    },
  
    markAdopted: function(adopters, account) {
      var poeInstance;

      App.contracts.ProofOfExistence.deployed().then(function(instance) {
        poeInstance = instance;
        id = document.getElementById("txtId").value;
        console.log(id);
        return poeInstance.compare.call(id, texto);
      }).then(function(result) {
        console.log(result);
        if(result) {
          document.getElementById("lblResult").innerHTML = "Resultado: Igual";
        }
        else {
          document.getElementById("lblResult").innerHTML = "Resultado: Diferente";
        }
        /*for (i = 0; i < hash_text.length; i++) {
          if (hash_text[i] !== '0x0000000000000000000000000000000000000000000000000000000000000000') {
            console.log(hash_text[i]);
            document.getElementById('lblResult').innerHTML += "id: " + i + "</br> hash: " +
            web3.toAscii(hash_text[i]) + "</br>";
          }
        }*/
      }).catch(function(err) {
        console.log(err.message);
      });
    }


  };
  
  $(function() {
    $(window).load(function() {
      App.init();
    });
  });
  