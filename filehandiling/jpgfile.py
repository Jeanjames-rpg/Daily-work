from PIL import Image,ImageDraw


# Create → Image.new()
# Open → Image.open()
# Show → img.show()
# Save → img.save()
# Edit → resize / crop / rotate / convert
# Draw → ImageDraw
# Info → size, mode, format
# Binary → rb / wb

#creating a file
I=Image.new("RGB",(300,300),color="red")
I.save("image.jpg")


#opening 
img= Image.open("image.jpg")
img.show()


#creating a image with text

N=Image.new("RGB",(300,300),color="white")

draw = ImageDraw.Draw(N)
draw.text((50,150),"Hello Jean",fill="black")
N.save("new_file.jpg")