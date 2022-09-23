#pragma once

#include "runtime/function/framework/component/component.h"
#include "runtime/resource/res_type/components/camera_data.h"
namespace Piccolo
{
    REFLECTION_TYPE(CameraDataComponent)
    CLASS(CameraDataComponent : public Component, WhiteListFields)
    {
        REFLECTION_BODY(CameraDataComponent)
    public:
        CameraDataComponent() {};
        void tick(float delta_time) override;

    private:
        void tickCameraData();

    private:
        META(Enable)
        CameraDataComponentRes camera_data_res;
    };
} // namespace Piccolo