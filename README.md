# Image Upload

With this update, I have implemented a way to upload user images into the creation of a new campground, adding additional images to an existing campground and deleting existing images from a campground. The campgrounds also now have a carousel of the uploaded images.

This is done using the Cloudinary service and Multer middleware. The edit page, where the deleting of images and uploading of additional images, is also using virtuals in the url pulled from Cloudinary to modify the thumbnails on load. 

Additional front-end design needs to be done and there are a lot of holes in the back-end still like requiring a maximum of images, image size, displaying front-end errors for incorrect file types, etc. So at this point, it is not production-level ready. We'll see if I can tackle all the problems a full team has to diagnose.
