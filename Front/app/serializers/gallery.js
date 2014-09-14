import applicationSerializer from 'app/serializers/application';
export default applicationSerializer.extend({
	attrs: {
        galleryItems : {embedded: 'always'}
    }
});

