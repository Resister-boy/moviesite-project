import axios from "axios";
import _uniqBy from 'lodash/uniqBy' // list에서 중복되는 값 제거해주는 Library

const _defaultMessage = 'Search for the movie title!'

export default {
  // module
  namespaced: true,
  // data
  state: () => ({
    movies: [] , // Array Type으로 movies Data 선언
    message: _defaultMessage, // String Type으로 message 선언&할당
    loading: false, // Boolean Type으로 loading 선언 & 할당
    theMovie: {} // Object Type으로 theMovie 선언
  }),
  // computed
  // Dynamic한 변수 컨트롤
  getters: {
    movieIds(state) {
      // movies list에서 movie.imdbID로 반환
      return state.movies.map(movie => movie.imdbID)
    }
  },
  // methods => 데이터 변경 시 사용
  mutations: {
    updateState(state, payload) {
      // ['movies', 'message', 'loading']
      // Data 상태 변경
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state) {
      state.movies = [],
      state.message = _defaultMessage,
      state.loading = false
    }
  },
  // methods => 데이터 변경 불가 + 비동기
  actions: {
    async searchMovies({ commit, state }, payload) {
      if(state.loading) return

      commit('updateState', {
        message: '',
        loading: true
      })

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
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },
    async searchMovieWithId({ state, commit }, payload) {
      if(state.loading) return 
      
      commit('updateState', {
        theMovie: {},
        loading: true
      })

      try {
        const response = await _fetchMovie(payload)
        console.log(response.data)
        commit('updateState', {
          theMovie: response.data
        })
      } catch (error) {
        commit('updateState', {
          theMovie: {}
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },
  }
}

function _fetchMovie(payload) {
  const { title, type, year, page, id } = payload
  const OMDB_API_KEY  = '7035c60c'
  const apiUrl = id 
    ? `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
    : `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&=${year}&page=${page}`

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