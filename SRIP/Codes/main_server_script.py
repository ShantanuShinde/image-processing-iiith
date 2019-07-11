'''
This module is to run the main server script of the experiment
and also to process the images and return the result
'''

import base64
import io
import cv2
from flask import render_template, Flask, request, send_from_directory
from scipy import ndimage, signal
import numpy as np
from PIL import Image


app = Flask(__name__, template_folder="html_template")
app.config['CUSTOM_STATIC_PATH'] = "../Libraries"

WINDOW_SIZES = [(3, 3), (5, 5), (7, 7)]
IMAGE = cv2.imread("static/Images/Mosaic.png", 0)

def triangle_kernel(kerlen):
    '''
    This function return a 2d triangle kernel of the given size "kerlen"
    '''
    kernel1d = ((signal.sawtooth(np.linspace(0, 2 * np.pi, kerlen + 2), 0.5) + 1) / 2)[1:-1]
    kernel2d = np.outer(kernel1d, kernel1d)
    kernel2d /= kernel2d.sum()
    return kernel2d

def unsharp_mask(img, window_size):
    '''
    This function applies unsharp mask on the passed image with the given window size
    '''
    gaussian = cv2.GaussianBlur(img, window_size, 10.0)
    return cv2.addWeighted(img, 1.5, gaussian, -0.5, 0, img)

def apply_filter():
    '''
    This function is to apply one of the filters to the image
    '''
    img_num = int(request.values["imageNumber"])
    if img_num == 1:
        img = IMAGE[0:300, 0:300]
    elif img_num == 2:
        img = IMAGE[0:300, 300:600]
    elif img_num == 3:
        img = IMAGE[0:300, 600:900]
    elif img_num == 4:
        img = IMAGE[300:600, 0:300]
    elif img_num == 5:
        img = IMAGE[300:600, 300:600]
    elif img_num == 6:
        img = IMAGE[300:600, 600:900]
    elif img_num == 7:
        img = IMAGE[600:900, 0:300]
    elif img_num == 8:
        img = IMAGE[600:900, 300:600]
    elif img_num == 9:
        img = IMAGE[600:900, 600:900]
    win_size = int(request.values["windowSize"]) - 1
    filter_num = int(request.values["filter"])
    if filter_num == 1:
        img = cv2.blur(img, WINDOW_SIZES[win_size])
    elif filter_num == 2:
        kernel = triangle_kernel(WINDOW_SIZES[win_size-1][0])
        img = ndimage.filters.convolve(img, kernel)
    elif filter_num == 3:
        img = cv2.GaussianBlur(img, WINDOW_SIZES[win_size], 0)
    elif filter_num == 4:
        img = cv2.medianBlur(img, WINDOW_SIZES[win_size][0])
    elif filter_num == 5:
        img = unsharp_mask(img, WINDOW_SIZES[win_size])
    return img

@app.route('/apply_filter', methods=['GET', 'POST'])
def button_pressed():
    '''
    This function is called on pressing Run button on the front end
    '''
    img = apply_filter()
    img_pil = Image.fromarray(img.astype("uint8"))
    temp_file = io.BytesIO()
    img_pil.save(temp_file, 'PNG')
    base64_image = base64.b64encode(temp_file.getvalue())
    return base64_image

@app.route('/Libraries/<path:filename>')
def custom_static(filename):
    '''
    This function is to handle access of libraries in the HTML template
    '''
    return send_from_directory(app.config['CUSTOM_STATIC_PATH'], filename)

@app.route('/')
def render():
    '''
    This function is to render the html template
    '''
    return render_template('main_html_template.html')

if __name__ == '__main__':
    app.run(debug=True)
