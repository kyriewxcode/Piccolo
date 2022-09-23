#include "runtime/function/framework/component/camera/camera_data_component.h"
#include "runtime/function/global/global_context.h"
#include "runtime/function/render/render_system.h"

namespace Piccolo
{
    void CameraDataComponent::tick(float delta_time) { this->tickCameraData(); }

    void CameraDataComponent::tickCameraData()
    {
        g_runtime_global_context.m_render_system->getRenderCamera()->setFOVx(camera_data_res.fov);
    }
} // namespace Piccolo