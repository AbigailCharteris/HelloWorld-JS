/*

SCSS (css version of SASS) is a CSS Preprocessor which extends and compiles into plain CSS

addresses following issues with css:
colour palletes - colours are manually set, no way to define a named reusable colour pallete.
Duplication - no resuse results in a lot of Duplication
Cascading - inheriting parent styles is messy, difficult to source original styles
calculations - no support for on the fly calculations 
importing problem - you need to import all styles manually into html or use @import tag in css

SCSS:
supports calculations:

eg:
html
{
    font-size: 10px + 14px
}

compiled ouput css = font-size: 24px


########################## 
VARIABLES 
##########################

$variableName: someValue or list of values or calculation 

colour functions: 
color: lighten ($color, 10%)
color: darken ($color, 10%)
color: saturate ($color, 10%)
color: desaturate ($color, 10%)
color: fade_in ($color, .1)
color: fade_out ($color, .1)
color: invert ($color)
color: complement ($color)

other functions:
$quoted: quote($sometext)
$unquoted: unquote($sometext)

$value: if(true, $color1, $color2)
$rnf: round(3.14)
$top: ceil(3.14) 
$bot: floor(3.14)
$per: percentage(.14)

String Interpolation:

use the #{} syntax to inject values defined/calc elsewhere

eg:
$root: "/images/";
...
background: url("#{$root}background/jpg"); --> "/images/background.jpg"
...

or:
$name: "my-class";

.#{name}{
    color: blue;
}

###########################
RULES
###########################

allow you to nest rule (ie named css groups by type)

eg: standard css
nav {
    font: ...    
}

nav ul {
    color:...
}

nav ul li {
    margin: ...
}

which are nested nav =? nav ul => nav ul li
SCSS is more concise in appearance, by grouping children styles in {}
eg:
nav{
    font:...
    ul {
        color: ...
        li {
            margin: ...
        }
    }
}

use parent selector (&) to mix with parent rule:

a {
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
}

results in css:
a { text-decoration: none;}
a:hover { text-decoration: underline;}

##################################################
DIRECTIVES
#################################################

@import
@extend
@mixin
@function 


------- @import ---------------

@import "foo.css" --> emits css import

Can apply the same to scss file, but it embeds the results i.e. not just a link, but where it's declare it will insert the imported scss thus reducing the need for a server round trip
@import "foo.scss"

By embedding we can also nest smaller reuseable scss into specific locations in our scss
eg:

#main{
    @import: "colors";
}

-------- @extend -----------------

basically allows you in inherit styles from another scss def

.button{
    color: Black;
}
.submit-button {
    @extend .button;    <------------ inherit .button style
    border: 1px Black Solid;
}


---------- @mixin ----------
repeatable sections i.e. reuse
feel like functions
used to insert one or more name/value pairs
can take params, defaults and overloads

eg:

@mixin font-large {
    font:{
        ...
    }
}

#form {
 @include font-large;
}

params:

@mixin rounded-corners-all ($size) {
    borer-radius: $size;    
}

usage:

#main{
    color: Black;
    @import rounded-corners-all(5px);
}

#subPart {
    color: Black;
    @import rounded-corners-all(20px);
}

--------- @function ---------------
allows for value calculations

$app-width: 900px;

@function column-width($cols) {
    @return ($app-width / $cols) - ($cols * 5px);
}

#main {
    width: column-width(3);
}


#############################
CONTROL DIRECTIVES
#############################

For control flow:

@if / @else if / @else

@for --> @for $col from 1 through 4 { ... }

@each --> @each $item in first, second, third, fourth {
            .#{$item}{ 
                background-url: url(#{item}.jpg);
            }
         }

@while -->
$i: 1;
@while $i < 5 {
    h#{$i}{
        font-size: $i * 4px;
        $i: $i + 1;
    }
}

 */