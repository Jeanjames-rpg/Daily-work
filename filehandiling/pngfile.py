from PIL import Image,ImageDraw

#creating
# img = Image.new("RGBA",(300,300),color=(0,0,255,128))
# img.save("image.png")

#opening
# img = Image.open("image.png")
# img.show()

# print(img.format)
# print(img.mode)
# print(img.size)

# resize
# resized = img.resize((200,200))
# resized.save("resized.png")

# img= Image.open("resized.png")
# img.show()

#draw text
I=Image.new("RGBA",(300,300),color="red")

draw = ImageDraw.Draw(I)
draw.text((100,200),"Hello How Are You",fill="black")

I.save("text.png")

img = Image.open("text.png")
img.show()