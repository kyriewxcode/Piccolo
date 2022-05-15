#version 310 es

#extension GL_GOOGLE_include_directive : enable

#include "constants.h"

layout(input_attachment_index = 0, set = 0, binding = 0) uniform highp subpassInput in_color;

layout(set=0, binding = 1) uniform highp sampler2D in_texture_sampler;

layout(location = 0) in highp vec2 in_uv;

struct ResolutionData
{
    highp vec4 screen_resolution;
    highp vec4 editor_screen_resolution;
};

layout(push_constant) uniform constants
{
    ResolutionData resolution_data;
};

highp vec2 get_screen_uv(highp vec2 uv)
{
    highp vec4 screen_resolution = resolution_data.screen_resolution;
    highp vec4 editor_screen_resolution = resolution_data.editor_screen_resolution;

    highp vec2 editor_ratio = editor_screen_resolution.zw / screen_resolution.zw;
    highp vec2 offset = editor_screen_resolution.xy / screen_resolution.zw;

    return offset.xy + uv.xy * editor_ratio;
}

highp vec2 Circle(highp float Start, highp float Points, highp float Point)
{
    highp float Rad = (3.141592 * 2.0 * (1.0 / Points)) * (Point + Start);
    return vec2(sin(Rad), cos(Rad));
}

highp vec4 Blur(sampler2D tex, highp vec2 in_uv)
{
    highp vec2 uv = get_screen_uv(in_uv);
    highp vec2 PixelOffset = 1.0 / resolution_data.screen_resolution.zw;

    highp float Start = 2.0 / 14.0;
    highp vec2 Scale = 0.66 * 4.0 * 2.0 * PixelOffset.xy;

    highp vec3 N0 = texture(tex, uv + Circle(Start, 14.0, 0.0) * Scale).rgb;
    highp vec3 N1 = texture(tex, uv + Circle(Start, 14.0, 1.0) * Scale).rgb;
    highp vec3 N2 = texture(tex, uv + Circle(Start, 14.0, 2.0) * Scale).rgb;
    highp vec3 N3 = texture(tex, uv + Circle(Start, 14.0, 3.0) * Scale).rgb;
    highp vec3 N4 = texture(tex, uv + Circle(Start, 14.0, 4.0) * Scale).rgb;
    highp vec3 N5 = texture(tex, uv + Circle(Start, 14.0, 5.0) * Scale).rgb;
    highp vec3 N6 = texture(tex, uv + Circle(Start, 14.0, 6.0) * Scale).rgb;
    highp vec3 N7 = texture(tex, uv + Circle(Start, 14.0, 7.0) * Scale).rgb;
    highp vec3 N8 = texture(tex, uv + Circle(Start, 14.0, 8.0) * Scale).rgb;
    highp vec3 N9 = texture(tex, uv + Circle(Start, 14.0, 9.0) * Scale).rgb;
    highp vec3 N10 = texture(tex, uv + Circle(Start, 14.0, 10.0) * Scale).rgb;
    highp vec3 N11 = texture(tex, uv + Circle(Start, 14.0, 11.0) * Scale).rgb;
    highp vec3 N12 = texture(tex, uv + Circle(Start, 14.0, 12.0) * Scale).rgb;
    highp vec3 N13 = texture(tex, uv + Circle(Start, 14.0, 13.0) * Scale).rgb;
    highp vec3 N14 = texture(tex, uv).rgb;

    highp float W = 1.0 / 15.0;

    highp vec3 color = vec3(0, 0, 0);

    color.rgb =
    (N0 * W) +
    (N1 * W) +
    (N2 * W) +
    (N3 * W) +
    (N4 * W) +
    (N5 * W) +
    (N6 * W) +
    (N7 * W) +
    (N8 * W) +
    (N9 * W) +
    (N10 * W) +
    (N11 * W) +
    (N12 * W) +
    (N13 * W) +
    (N14 * W);

    return vec4(color.rgb, 1.0);
}

layout(location = 0) out highp vec4 out_color;

#define VERTIAL_SPLIT

void main()
{
    highp vec4 color = subpassLoad(in_color).rgba;
    highp vec4 blurColor = Blur(in_texture_sampler, in_uv);
#ifdef VERTIAL_SPLIT
    if (in_uv.x > 0.5)
    {
        if (in_uv.x <= 0.505)
        {
            out_color = vec4(0, 0, 0, 0);
        }
        else 
        {
            out_color = color;
        }
    }
    else
    {
        out_color = blurColor;
    }
#else
    out_color = blurColor;
#endif

}