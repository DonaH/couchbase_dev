'use strict';

var couchbase = require('couchbase');
var uuid = require('uuid');

// Connect to couchbase
var cluster = new couchbase.Cluster('couchbase://localhost?fetch_mutation_tokens=true');

// Open the bucket
var bucket = cluster.openBucket('default');

// Insert some user documents
bucket.upsert(uuid.v4(), {
  'first_name': 'John',
  'last_name': 'Xie',
  'city': 'Timbuktu',
  'country': 'LaLaLand'
}, function(err, res) {
  if (err) throw err;

  // Query for all our users
  var qs = 'SELECT * FROM `default` ORDER BY first_name, last_name';
  var q = couchbase.N1qlQuery.fromString(qs).consistency(couchbase.N1qlQuery.Consistency.REQUEST_PLUS);
  bucket.query(q, function(err, rows, meta) {
    if (err) throw err;

    for (var i in rows) {
      console.log(rows[i]);
    }

    process.exit(0);
  });
});
//
// /including the Node.js dependency
// var couchbase = require(”couchbase");
//
// //connecting to a couchbase cluster
// var cluster = new couchbase.Cluster("couchbase://localhost:8091");
//
// //opening a bucket in the cluster
// var myBucket = cluster.openBucket("travel-sample", “password");
//
// //preparing N1ql
// var myQuery = couchbase.N1qlQuery();
//
// //creating and saving a Document
// var document = { firstname: “Matt", lastname: “Groves“ };
// myBucket.insert("my-key", document, function(error, result) {});
