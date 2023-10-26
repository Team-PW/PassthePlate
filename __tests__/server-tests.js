const request = require('supertest');
const express = require('express');

const server = 'http://localhost:1234';


describe('Route integration', () => {
  describe('/listings', () => {
    describe('GET', () => {
      it('responds with 200', () => request(server)
        .get('/listings')
        // .then(data => data.json())
        .expect(200)
        // .then(array => {
        //   console.log('array', array)
        //   expect(/*Array.isArray(array)*/typeof array === 'number')
        // })
        // .catch(err => {
        //     console.log(err)
        // })
        )
    });
  });
});
