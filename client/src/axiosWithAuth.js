import axios from 'axios'

export const axiosWithAuth = () => {
  const token = localStorage.token

  return (
    axios
      .create({
        headers: {
          'Content-Type': 'application.json',
          'Authorization': token
        }
      })
  )
}

export const customAxios = (url, obj) => {
  return axios
    .put(url, obj, { headers: { 'Authorization': localStorage.token } })

}