void setup() {
  size (, );  // Pixel dimensions of below loadimage
  variable = loadImage("imageName.type");
}
void draw() {
  // image(variable, 0, 0);
  loadPixels();
  variable.loadPixels();
  for (int x=0; x<width; x++) {
    for (int y=0; y<height; y++) {
      int loc = x + y * width;
      float r = red(variable.pixels[loc]);
      float g = green(variable.pixels[loc]);
      float b = blue(variable.pixels[loc]);
      pixels[loc] = color(r, g, b);
    }
  }
  updatePixels();
}
