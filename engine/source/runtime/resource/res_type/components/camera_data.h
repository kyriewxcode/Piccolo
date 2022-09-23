#pragma once

#include "runtime/core/meta/reflection/reflection.h"

namespace Piccolo
{
    REFLECTION_TYPE(CameraDataComponentRes)
    CLASS(CameraDataComponentRes, Fields)
    {
        REFLECTION_BODY(CameraDataComponentRes);

    public:
        CameraDataComponentRes() = default;
        ~CameraDataComponentRes() {};

        float fov {89.0f};
    };
} // namespace Piccolo