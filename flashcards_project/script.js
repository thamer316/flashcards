/* الخط العام */
body {
  font-family: 'Arial', sans-serif;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
  padding: 20px;
  box-sizing: border-box;
}
.card-container {
  perspective: 1000px;
  width: 90%;
  max-width: 600px;
  aspect-ratio: 3 / 2;
  margin-bottom: 20px;
}
.card {
  width: 100%;
  height: 100%;
  text-align: center;
  border-radius: 16px;
  background: #fff;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 12px 24px rgba(0,0,0,0.3);
  position: relative;
}
.card.flipped {
  transform: rotateY(180deg);
}
.card .front,
.card .back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  padding: 28px;
  flex-direction: column;
  box-sizing: border-box;
}
.card .front {
  background-color: #ffffff;
}
.card .back {
  background-color: #e0f7fa;
  transform: rotateY(180deg);
}
.buttons {
  visibility: hidden;
  height: 60px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 10px;
  transition: visibility 0.2s ease;
}
.buttons.visible {
  visibility: visible;
}
button {
  padding: 10px 16px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  min-width: 120px;
  text-align: center;
  box-sizing: border-box;
}
.correct {
  background-color: #28a745;
  color: white;
}
.wrong {
  background-color: #dc3545;
  color: white;
}
.result {
  margin-top: 20px;
  font-size: 18px;
  text-align: center;
  color: #333;
}
img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}
@media (max-width: 400px) {
  .card-container {
    width: 100%;
    height: auto;
    aspect-ratio: 3 / 2;
  }
  button {
    font-size: 14px;
    min-width: 100px;
  }
  .card .front, .card .back {
    font-size: 24px;
    padding: 18px;
  }
}
