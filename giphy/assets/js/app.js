var publicKey = 'dc6zaTOxFJmzC';
var apiEndPoint = 'https://api.giphy.com/v1/gifs/search';

new Vue({
    el: '#app',
    data: {
        query: '',
        results: false,
        current_gif: false,
        source: false,
        rating: false,
        date: false
    },
    methods: {
        viewGIF: function (gif) {
            this.current_gif = gif.images.original.url;
            this.source = gif.source;
            this.rating = gif.rating;
            this.date = gif.import_datetime;
            //console.log(gif);
        }
    },
    computed: {
        liveSearch: function () {
            var self = this;
            axios.get(apiEndPoint, {
                params: {
                    api_key: publicKey,
                    q: self.query.split(' ').join('+'),
                    limit: 20
                }
            })
            .then(function (response) {
                self.results = response.data.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        }
  }
});
