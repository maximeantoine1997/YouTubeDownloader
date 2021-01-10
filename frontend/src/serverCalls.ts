import axios from "axios"

export const get_request = async (link: string) => {
    return axios.get(link).then(res => {
        if (res.status === 200) {
            console.log(res.data)
            return res.data
        }
        throw Error(`get request failed with status: ${res.status}`)
    })

}

export const post_request = async (link: string, data: unknown) => {
    return axios.post(link, { data })
      .then(res => {
        if (res.status === 200) return
        throw Error(`post request failed with status: ${res.status}`)
      })
}