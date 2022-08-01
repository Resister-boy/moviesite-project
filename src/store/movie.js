import axios from "axios";
import _uniqBy from 'lodash/uniqBy'

export default {
  // module
  namespaced: true,
  // data
  state: () => ({
    movies: [] ,
    message: '',
    loading: false
  }),
  // computed
  getters: {
    movieIds(state) {
      return state.movies.map(movie => movie.imdbID)
    }
  },
  // methods => 데이터 변경 시 사용
  mutations: {
    updateState(state, payload) {
      // ['movies', 'message', 'loading']
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state) {
      state.movies = []
    }
  },
  // methods => 데이터 변경 불가 + 비동기
  actions: {
    async searchMovies({ commit, state }, payload) {
      try {
        // 최초 요청
        const response = await _fetchMovie({
          ...payload,
          page: 1
        })
        // console.log(response)
        const { Search, totalResults } = response.data
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID')
        })
        const total = parseInt(totalResults, 10)
        const pageLength = Math.ceil(total / 10)

        // 추가 요청
        if(pageLength > 1) {
          for(let page = 2; page <= pageLength; page += 1) {
            if(page > (payload.number / 10)) break
            const response = await _fetchMovie({
              ...payload,
              page
            })
            const { Search } = response.data
            commit('updateState', {
              movies: [
                ...state.movies, 
                ..._uniqBy(Search, 'imdbID')
              ]
            }) 
          }
        }
      } catch(message) {
        commit('updateState', {
          movies: [], 
          message
        })
      }


    }
  }
}

function _fetchMovie(payload) {
  const { title, type, year, page } = payload
  const OMDB_API_KEY  = '7035c60c'
  const apiUrl = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&=${year}&page=${page}`

  return new Promise((resolve, reject) => {
    axios.get(apiUrl)
      .then((response) => {
        if(response.data.Error) {
          reject(response.data.Error)
        }
        resolve(response)
      })
      .catch((error) => {
        reject(error.message)
      })
  })
}