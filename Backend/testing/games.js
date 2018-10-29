const request = require('supertest')
const app = require('../app')
const testGame = {
  'GenreID': 2,
  'Title': 'TestGame123',
  'Publisher': 'TestPublisher'
}
let newGameID
describe('POST /games', () => {
  it('should return successmessage with new Game ID', (done) => {
    request(app)
      .post('/api/games')
      .send(testGame)
      .expect(200)
      .expect(response => {
        console.log(response.body)
        const correctMessage = response.body.startsWith('Successfully inserted Game with ID:')
        if (!correctMessage) throw new Error('Not the right response')
        else newGameID = parseInt(response.body.replace('Successfully inserted Game with ID: ', ''), 10)
      })
      .end(done)
  })
})

describe('GET /games/newGameID', () => {
  it('should return the game we just created', (done) => {
    const expectedGame = {
      'GameID': newGameID,
      'Title': 'TestGame123',
      'GenreID': 2,
      'Publisher': 'TestPublisher',
      'Released': null,
      'Image': null
    }
    request(app)
      .get('/api/games/' + newGameID)
      .expect(200, expectedGame)
      .end(done)
  })
})

describe('PUT /games/newGameID', () => {
  it('should change the title of the game we just created', (done) => {
    const gameToPut = {
      'GameID': newGameID,
      'Title': 'TestGame321',
      'GenreID': 2,
      'Publisher': 'TestPublisher'
    }
    request(app)
      .put('/api/games/' + newGameID)
      .send(gameToPut)
      .expect(200)
      .expect(response => {
        console.log(response.body)
        const correctMessage = response.body.startsWith('Successfully updated game:')
        if (!correctMessage) throw new Error('Not the right response')
        else {
          const returnedGameTitle = response.body.replace('Successfully updated game: ', '')
          if (returnedGameTitle !== 'TestGame321') throw new Error('Didn\'t return the right Title')
        }
      })
      .end(done)
  })
})

describe('DELETE /games/newGameID', () => {
  it('should delete the game we just created', (done) => {
    request(app)
      .delete('/api/games/' + newGameID)
      .send(testGame)
      .expect(200)
      .expect(response => {
        console.log(response.body)
        const correctMessage = response.body.startsWith('Successfully deleted game with gameID:')
        if (!correctMessage) throw new Error('Not the right response')
        else {
          const returnedGameID = parseInt(response.body.replace('Successfully deleted game with gameID: ', ''), 10)
          if (newGameID !== returnedGameID) throw new Error('Didn\'t return the right ID')
        }
      })
      .end(done)
  })
})
