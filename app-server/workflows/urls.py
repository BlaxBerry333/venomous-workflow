from django.urls import path, include

from .views import workflow_data


"""
GET     /api/<user_id>/workflow/data/list/    
POST    /api/<user_id>/workflow/data/create/    
GET     /api/<user_id>/workflow/data/<id>/   
PATCH   /api/<user_id>/workflow/data/<id>/   
PUT     /api/<user_id>/workflow/data/<id>/   
DELETE  /api/<user_id>/workflow/data/<id>/   
"""
urlpatterns = [
    # list
    path(
        "workflow/data/list/",
        workflow_data.WorkflowDataViewSet.as_view({"get": "list"}),
        name="workflow-data-list",
    ),
    # create
    path(
        "workflow/data/create/",
        workflow_data.WorkflowDataViewSet.as_view({"post": "create"}),
        name="workflow-data-create",
    ),
    # detail / update / delete
    path(
        "workflow/data/<str:pk>/",
        workflow_data.WorkflowDataViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
        name="workflow-data-detail",
    ),
]
