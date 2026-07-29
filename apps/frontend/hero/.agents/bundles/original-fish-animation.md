# Bundle: Original Fish Animation (Reference Project)

Джерело: `C:\Users\shmal\OneDrive\Desktop\malyuvaka_python\malyuvaka_py\reference\`
Python: `C:\Users\shmal\OneDrive\Desktop\malyuvaka_python\malyuvaka_py\`

---

## How It Works

Оригінальний CSS-підхід: риба — це 5 вкладених `<div>`, кожен 60×200px, що показують одне й те саме зображення (sprite `p1.PNG`, 300×200px) через `background-position` з різним зсувом (0, -60, -120, -180, -240px).

Кожен `<div>` має `transform-style: preserve-3d` і анімацію `rotate3d(0,1,0, Ndeg)` — обертання навколо осі Y (3D).

Зовнішній контейнер `.view` має `perspective: 800px` для 3D-проекції.

Хвилястість створюється НЕ зсувом фази між сегментами, а НАРОСТАННЯМ амплітуди від голови до хвоста: ±3° → ±10° → ±16° → ±42° → ±45°.

Рух риби (плавання вліво/вправо) — через anime.js (`translateX`, `scaleX: -1` для розвороту).

---

## Файли

### 1. reference/style2.css

```css
/* div {
  width: 60px;
  height: 200px;
  background-image: url(p1.PNG);
  overflow: hidden;
} */

.Riba1 { background-position: 0px 0px;float:left;  }
.Riba2 { background-position: -60px 0px; float:left;}
.Riba3 { background-position: -120px 0px; float:left;}
.Riba4 { background-position: -180px 0px;float:left; }
.Riba5 { background-position: -240px 0px; float:left;}

.view {
	-webkit-perspective: 800px;
	-moz-perspective: 800px;
	-o-perspective: 800px;
	-ms-perspective: 800px;
	perspective: 800px;
}

.Riba1{
	transform-style: preserve-3d;
	animation-name: anim1;
	animation-duration: 2s;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
}

.Riba2{
	transform-style: preserve-3d;
	animation-name: anim2;
	animation-duration: 2s;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
}

.Riba3{
	transform-style: preserve-3d;
	animation-name: anim3;
	animation-duration: 2s;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
}

.Riba4{
	transform-style: preserve-3d;
	animation-name: anim4;
	animation-duration: 2s;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
}

.Riba5{
	transform-style: preserve-3d;
	animation-name: anim5;
	animation-duration: 2s;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
}

@keyframes anim1{
0% {
	transition-delay: 150ms;
	transform: translate3d(59px,0,0) rotate3d(0,1,0,0deg);
}	
100% {
	transition-delay: 150ms;
	transform: translate3d(59px,0,0px) rotate3d(0,1,0,-3deg);
}	
50% {
	transition-delay: 150ms;
	transform: translate3d(59px,0,0) rotate3d(0,1,0,0deg);
}
75% {
	transform: translate3d(59px,0,0px) rotate3d(0,1,0,3deg);
}
100% {
	transition-delay: 150ms;
	transform: translate3d(59px,0,0) rotate3d(0,1,0,0deg);
}
}

@keyframes anim2{
0% {
	transition-delay: 150ms;
	transform: translate3d(59px,0,0) rotate3d(0,1,0,0deg);
}	
25% {
	transition-delay: 150ms;
	transform: translate3d(59px,0,0px) rotate3d(0,1,0,-10deg);
}	
50% {
	transition-delay: 150ms;
	transform: translate3d(59px,0,0) rotate3d(0,1,0,0deg);
}
75% {
	transform: translate3d(59px,0,0px) rotate3d(0,1,0,10deg);
}
100% {
	transition-delay: 150ms;
	transform: translate3d(59px,0,0) rotate3d(0,1,0,0deg);
}
}

@keyframes anim3{
0% {
	transition-delay: 100ms;
	transform: translate3d(59px,0,0) rotate3d(0,1,0,0deg);
}	
25% {
	transition-delay: 100ms;
	transform: translate3d(58px,0,10px) rotate3d(0,1,0,-16deg);
}	
50% {
	transition-delay: 100ms;
	transform: translate3d(59px,0,0) rotate3d(0,1,0,0deg);
}
75% {
	transform: translate3d(58px,0,-10px) rotate3d(0,1,0,16deg);
}
100% {
	transition-delay: 100ms;
	transform: translate3d(59px,0,0) rotate3d(0,1,0,0deg);
}
}

@keyframes anim4{
0% {
	transition-delay: 50ms;
	transform: translate3d(59px,0,0) rotate3d(0,1,0,0deg);
}	
25% {
	transition-delay: 50ms;
	transform: translate3d(55px,0,30px) rotate3d(0,1,0,-42deg);
}	
50% {
	transition-delay: 50ms;
	transform: translate3d(59px,0,0) rotate3d(0,1,0,0deg);
}
75% {
	transform: translate3d(54px,0,-23px) rotate3d(0,1,0,42deg);
}
100% {
	transition-delay: 50ms;
	transform: translate3d(59px,0,0) rotate3d(0,1,0,0deg);
}
}

@keyframes anim5{
0% {
	transform: translate3d(59px,0,0) rotate3d(0,1,0,0deg);
}	
25% {
	transform: translate3d(52px,0,20px) rotate3d(0,1,0,-45deg);
}	
50% {
	transform: translate3d(59px,0,0) rotate3d(0,1,0,0deg);
}
75% {
	transform: translate3d(52px,0,-20px) rotate3d(0,1,0,45deg);
}
100% {
	transform: translate3d(59px,0,0) rotate3d(0,1,0,0deg);
}
}
```

---

### 2. reference/Animations.js (секція риби)

```javascript
// Динамічне створення DOM для риби (секція AddImage, рядки 493-551):
if (mydata[i].Class == "Riba") {
    var AddDiv = 'id' + i;
    
    var div1 = document.createElement('div');
    document.getElementById('id' + i).appendChild(div1);
    div1.setAttribute('id','s1' + i);
    div1.setAttribute('class','Riba1');
    div1.style.width='60px';
    div1.style.height='200px';
    var SliceImage = "images/" + mydata[i].name;
    div1.style.backgroundImage = "url('" + SliceImage + "')";

    var div2 = document.createElement('div');
    document.getElementById('s1' + i).appendChild(div2);
    div2.setAttribute('id','s2' + i);
    div2.setAttribute('class','Riba2');
    div2.style.width='60px';
    div2.style.height='200px';
    div2.style.backgroundImage = "url('" + SliceImage + "')";

    var div3 = document.createElement('div');
    document.getElementById('s2' + i).appendChild(div3);
    div3.setAttribute('id','s3' + i);
    div3.setAttribute('class','Riba3');
    div3.style.width='60px';
    div3.style.height='200px';
    div3.style.backgroundImage = "url('" + SliceImage + "')";

    var div4 = document.createElement('div');
    document.getElementById('s3' + i).appendChild(div4);
    div4.setAttribute('id','s4' + i);
    div4.setAttribute('class','Riba4');
    div4.style.width='60px';
    div4.style.height='200px';
    div4.style.backgroundImage = "url('" + SliceImage + "')";

    var div5 = document.createElement('div');
    document.getElementById('s4' + i).appendChild(div5);
    div5.setAttribute('id','s5' + i);
    div5.setAttribute('class','Riba5');
    div5.style.width='60px';
    div5.style.height='200px';
    div5.style.backgroundImage = "url('" + SliceImage + "')";

    myIMG.remove();
}

// anime.js рух (myMove, рядки 635-801):
function myMove(object) {
    // Фаза 1: старт — випадкове позиціонування
    anime({
        targets: object,
        translateX: [
            { value: RandomStartX, duration: RandomStartSpeed, delay: 0 },
            { value: 1200, duration: RandomStartSpeed, delay: 1000 },
        ],
        translateY: [
            { value: RandomStartY, duration: RandomStartSpeed, delay: 0 },
            { value: RandomStartY, duration: RandomStartSpeed, delay: 1000 },
        ],
        scaleX: [{ value: -1, duration: 1000, delay: RandomStartSpeed }],
        scale: [
            { value: RandomStartScale, duration: RandomStartSpeed, delay: 0 },
            { value: RandomStartScale, duration: RandomStartSpeed, delay: RandomStartSpeed },
        ],
        easing: 'easeInOutQuad',
        complete: function(anim) { Right(); },
    });

    // Фаза 2: Right() — плавання вліво ( scaleX: 1 )
    function Right() {
        anime({
            targets: object,
            translateX: [{ value: -1200, duration: RandomRightSpeed, delay: 0 }],
            translateY: [{ value: RandomRightY, duration: RandomRightSpeed, delay: 0 }],
            scaleX: [{ value: 1, duration: 0, delay: 0 }],
            scale: [{ value: RandomRightScale, duration: 0, delay: 0 }],
            easing: 'easeInOutQuad',
            complete: function(anim) { Left(); },
        });
    }

    // Фаза 3: Left() — плавання вправо ( scaleX: -1, розворот )
    function Left() {
        anime({
            targets: object,
            translateX: [{ value: 1200, duration: RandomLeftSpeed, delay: 0 }],
            translateY: [{ value: RandomLeftY, duration: RandomLeftSpeed, delay: 0 }],
            scaleX: [{ value: -1, duration: 0, delay: 0 }],
            scale: [{ value: RandomLeftScale, duration: 0, delay: 0 }],
            easing: 'easeInOutQuad',
            complete: function(anim) { Right(); },
        });
    }
}
```

---

### 3. reference/index2.html

```html
<!DOCTYPE HTML>
<html lang="en">
    <head>
        <title>3D Thumbnail Hover Effects</title>
        <meta charset="UTF-8" />
        <link rel="stylesheet" type="text/css" href="css/demo.css" />
        <link rel="stylesheet" type="text/css" href="css/style_common.css" />
        <link rel="stylesheet" type="text/css" href="css/style2.css" />
    </head>
<body>
    <video muted autoplay loop id="Fon" src="VideoFon/video.mp4"></video>

    <div id="grid" class="main">
        <div id="Kartinki"></div>
    </div>

    <script type="text/javascript" src="js/Animations.js"></script> 
    <script type="text/javascript" src="data.json"></script>
    <script type="text/javascript">
        myLoop(); 
        AddImage();
    </script>
    <script type="text/javascript" src="js/anime.min.js"></script> 
</body>
</html>
```

---

### 4. reference/style_common.css (релевантні секції)

```css
.view {
    width: 300px;
    height: 200px;
    margin: 10px;
    float: left;
    position: relative;
    perspective: 500px;  /* style2.css перезаписує на 800px */
}

.view .slice {
    width: 60px;
    height: 100%;
    transform-style: preserve-3d;
    transform-origin: left center;   /* pivot point — лівий край (joint) */
    transition: transform 150ms ease-in-out;
}
```

---

### 5. config.py (Python: FISH_SEGMENTS)

```python
@dataclass
class SegmentKeyframe:
    """Одна точка ключового кадру: частка циклу (0..1), кут (град), Z (px)."""
    t: float
    angle: float
    z: float = 0.0

@dataclass
class SegmentDef:
    keyframes: List[SegmentKeyframe]
    overlap: int = 0

def _symmetric_wave(peak_angle: float, peak_z: float = 0.0, z_sign_flip: bool = True) -> List[SegmentKeyframe]:
    z2 = -peak_z if z_sign_flip else peak_z
    return [
        SegmentKeyframe(0.00, 0.0, 0.0),
        SegmentKeyframe(0.25, -peak_angle, peak_z),
        SegmentKeyframe(0.50, 0.0, 0.0),
        SegmentKeyframe(0.75, peak_angle, z2),
        SegmentKeyframe(1.00, 0.0, 0.0),
    ]

FISH_SEGMENTS: List[SegmentDef] = [
    SegmentDef(keyframes=_symmetric_wave(3)),                 # anim1 (голова)
    SegmentDef(keyframes=_symmetric_wave(10)),                # anim2
    SegmentDef(keyframes=_symmetric_wave(16, 10)),            # anim3 (z: +10 / -10)
    SegmentDef(keyframes=[                                     # anim4 — z асиметричний (+30 / -23)
        SegmentKeyframe(0.00, 0.0, 0.0),
        SegmentKeyframe(0.25, -42.0, 30.0),
        SegmentKeyframe(0.50, 0.0, 0.0),
        SegmentKeyframe(0.75, 42.0, -23.0),
        SegmentKeyframe(1.00, 0.0, 0.0),
    ]),
    SegmentDef(keyframes=_symmetric_wave(45, 20)),            # anim5 (хвіст, z: +20 / -20)
]

ANIMATION_PRESETS = {
    "Riba": AnimConfig(
        anim_type="hinge", duration=2.0,
        segments=list(FISH_SEGMENTS), perspective=800.0,
    ),
}
```

---

### 6. common/animation.py (Python: animate_hinge)

```python
def _interp_keyframes(keyframes, t_norm):
    """Piecewise-linear interpolation across keyframes by normalized time."""
    for i in range(len(keyframes) - 1):
        p0, p1 = keyframes[i], keyframes[i + 1]
        if p0.t <= t_norm <= p1.t:
            ratio = (t_norm - p0.t) / (p1.t - p0.t)
            angle = p0.angle + (p1.angle - p0.angle) * ratio
            z = p0.z + (p1.z - p0.z) * ratio
            return angle, z
    return keyframes[-1].angle, keyframes[-1].z

def animate_hinge(surface, t, duration, segments, perspective=800.0):
    """
    Main fish hinge animation:
    1. Divides surface into n equal-width segments.
    2. Computes t_norm from (time % duration) / duration.
    3. For each segment: interpolates keyframes, accumulates angle
       (cumulative nesting), calculates perspective scale.
    4. All segments use the SAME phase (t_norm) — waviness comes
       solely from increasing amplitude from head to tail.
    """
    n = len(segments)
    seg_w = surface.get_width() // n
    t_norm = (t % duration) / duration
    
    output = pygame.Surface(surface.get_size(), pygame.SRCALPHA, 32)
    cumulative_angle = 0.0
    
    for i, seg in enumerate(segments):
        angle, z = _interp_keyframes(seg.keyframes, t_norm)
        cumulative_angle += angle
        
        # Perspective scale: perspective / (perspective - z)
        scale = perspective / (perspective - z)
        
        # Extract segment slice
        src_rect = pygame.Rect(i * seg_w, 0, seg_w, surface.get_height())
        segment_surf = surface.subsurface(src_rect).copy()
        
        # Apply rotation + perspective warp
        # (simplified — full impl uses cv2.warpPerspective)
        warped = pygame.transform.rotozoom(segment_surf, cumulative_angle, scale)
        
        # Blit with offset
        x_offset = i * seg_w
        output.blit(warped, (x_offset, 0))
    
    return output
```
