const request = require('supertest');
const express = require('express')
const app = express()
var assert = require('assert')
var expect = require('chai').expect

var io = require('socket.io-client');

request = request('http://localhost:5000');

describe('participant_upsert', function () {
    it('respond with json', function () {
        return request.
        post('/participant_upsert').
        then(response => {
            //console.log(response);
            assert(response.body.email === 'objectbb@gmail.com')
        })
    });
});

describe('account_upsert', function () {
    it('respond with json', function () {
        return request.
        post('/account_upsert').
        then(response => {
            //console.log(response);
            assert(response.body.email === 'objectbb@gmail.com')
        })
    });
});

describe('account_get', function () {
    it('respond with json', function () {
        return request.
        post('/account_get').
        then(response => {
            //console.log(response);
            assert(response.body.email === 'objectbb@gmail.com')
        })
    });
});

describe('event_get', function () {
    it('respond with json', function () {
        return request.
        post('/event_get').
        then(response => {
            //console.log(response);
            assert(response.body.email === 'objectbb@gmail.com')
        })
    });
});

describe('event_upsert', function () {
    it('respond with json', function () {
        return request.
        post('/event_upsert').
        then(response => {
            //console.log(response);
            assert(response.body.email === 'objectbb@gmail.com')
        })
    });
});




describe('participant_broadcast', function () {
    var socket;
    beforeEach(function (done) {
        // Setup
        socket = io.connect('http://localhost:5000', {
            transports: ['websocket', 'polling'],
            forceNew: true,
            reconnection: false
        });
        socket.on('connect', function () {
            console.log('worked...');

            socket.emit('participant_broadcast', "test", function (confirmation) {
                console.log(confirmation);
            });
            //done();
        });
        socket.on('disconnect', function () {
            console.log('disconnected...');
        });
        done();
    });





    it('Clients should receive a message when the `message` event is emited.',
        function (done) {


        });
});