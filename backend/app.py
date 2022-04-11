# os to handle saving/deleting images
import os
import cv2
# Import the required functions from flask
from flask import Flask, request, flash, redirect, send_file
from werkzeug.utils import secure_filename
# TensorFlow for loading the model
import tensorflow as tf
from flask import Flask, Response, request, jsonify
import numpy as np
from flask import send_file
import base64
from io import BytesIO
from PIL import Image

# Creates a flask app with a name same as the file name
# we can refer to this flask app as 'app' in our program
app = Flask(__name__)

# uploaded images are stored in 'images' folder
UPLOAD_FOLDER = './images'
 
# Setting a environment variable
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Assuming the model is saved in folder models as model_1.h5
model = tf.keras.models.load_model('models/final_model.h5')

@app.route('/', methods=['POST'])
def upload_file():

        # Read from file and convert to tensor
        # Needed if you use OpenCV, By default, it use BGR instead RGB
        image = cv2.imread("images/image.jpeg")
        print(image.shape)

        image = cv2.resize(image, (180, 180))
        print(image.shape)
        # Convert to Tensor of type float32 for example\
        image = tf.expand_dims(image, 0)
        image_tensor = tf.convert_to_tensor(image)

        # Add dimension to match with input mode 
        # image_tensor = tf.expand_dims(image_tensor, 0)

        # After you can predict image for example :
        predictions = model.predict(image_tensor, use_multiprocessing=True)
         
        # Delete the file
        # os.remove(filename)
        outs = ''
        if predictions == [[1]]:
            outs = 'PNEUOMONIA'
        elif predictions == [[0]]:
            outs = 'NORMAL'
        return "\n[+] The XRAY has: "+outs+"\n\n"

@app.route("/image", methods=['GET', 'POST'])
def image():
    if(request.method == "POST"):
        bytesOfImage = request.get_data()
        with open('images/image.jpeg', 'wb') as out:
            out.write(bytesOfImage)
        return "Image read"

# If this file is run as standalone file
# The app will run in debug mode
if __name__ == '__main__':
    app.run(debug=True)