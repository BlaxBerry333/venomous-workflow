import json
import re
from django.utils.deprecation import MiddlewareMixin
from rest_framework.request import Request

__all__ = ["CamelCaseResponseMiddleware", "SnakeCaseRequestMiddleware"]


def camel_to_snake(key: str) -> str:
    """
    Convert a string from camelCase to snake_case.
    """
    result = [key[0].lower()]
    for char in key[1:]:
        if char.isupper():
            result.extend(["_", char.lower()])
        else:
            result.append(char)
    return "".join(result)


def convert_dict_keys_to_snack_case(data: dict) -> dict:
    """
    Convert the keys of a dictionary to snake_case.
    """
    if not isinstance(data, dict):
        return data
    return {
        camel_to_snake(key): convert_dict_keys_to_snack_case(value)
        for key, value in data.items()
    }


def convert_dict_keys_to_camel_case(data) -> dict:
    """
    Convert a dictionary's keys to camelCase.
    """
    if isinstance(data, dict):
        return {
            re.sub(
                r"_([a-z])", lambda m: m.group(1).upper(), key
            ): convert_dict_keys_to_camel_case(value)
            for key, value in data.items()
        }
    elif isinstance(data, list):
        return [convert_dict_keys_to_camel_case(item) for item in data]
    return data


class CamelCaseResponseMiddleware(MiddlewareMixin):
    """
    Convert response keys to camelCase.
    """

    def process_response(self, request, response):
        is_json_response = "application/json" in response.get(
            "Content-Type", ""
        ) or "text/json" in response.get("Content-Type", "")
        if is_json_response:
            try:
                response_data = json.loads(response.content.decode("utf-8"))
                camel_case_data = convert_dict_keys_to_camel_case(response_data)
                response.content = json.dumps(camel_case_data).encode("utf-8")
                response["Content-Length"] = len(response.content)
            except (ValueError, UnicodeDecodeError):
                # If the response is not valid JSON, ignore it
                pass

        return response


class SnakeCaseRequestMiddleware(MiddlewareMixin):
    """
    Convert request keys to snake_case.
    """

    def process_request(self, request):
        if isinstance(request, Request):
            if request.content_type == "application/json":
                try:
                    if not request.body:
                        return None

                    data = json.loads(request.body)
                    converted_data = convert_dict_keys_to_snack_case(data)
                    # Convert the data back to a string
                    request._full_data = converted_data
                    request._data = converted_data

                except json.JSONDecodeError:
                    # If the request body is not valid JSON, ignore it
                    pass

            if request.GET:
                request.GET = convert_dict_keys_to_snack_case(request.GET.dict())
