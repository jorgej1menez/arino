import AdminLayouts from "@/Admin/Layouts/AdminLayouts";
import TextInput from "@/Admin/Components/Inputs/TextInput.jsx";
import { Head, router, usePage } from "@inertiajs/react";
import { Fragment, useEffect, useState } from "react";
import { produce } from "immer";

export default function Create({ permissions }) {
    const { errors } = usePage().props;
    const [data, setData] = useState({
        title: "",
        description: "",
        permissions: [],
    });

    // handle publish
    const handlePublish = (e) => {
        e.preventDefault();
        router.post(route("admin.roles.permissions.store"), data);
    };
    const permissionArray = Object.values(permissions.crud_permissions);

    return (
        <AdminLayouts>
            <Head title="Create role" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container-fluid">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">Create role</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <form className="row" onSubmit={handlePublish}>
                    <div className="col-lg-8">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">
                                        Role Details
                                    </h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <TextInput
                                        title="Role Title *"
                                        type="text"
                                        id="title"
                                        error={errors?.title}
                                        value={data.title}
                                        onChange={(e) =>
                                            setData(
                                                produce((draft) => {
                                                    draft.title =
                                                        e.target.value;
                                                })
                                            )
                                        }
                                    />
                                    <TextInput
                                        title="Description *"
                                        type="text"
                                        id="desc"
                                        error={errors?.description}
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                produce((draft) => {
                                                    draft.description =
                                                        e.target.value;
                                                })
                                            )
                                        }
                                    />
                                    <div className="pb-2">
                                        <strong>Permissions</strong>
                                    </div>

                                    {permissionArray.map((item, index) => (
                                        <Fragment key={`g-${index}`}>
                                            <div className="yoo-card-heading">
                                                <div className="yoo-card-heading-left">
                                                    <h2 className="yoo-card-title">
                                                        {item.title}
                                                    </h2>
                                                </div>
                                            </div>
                                            <div className="permission-group">
                                                <div className="yoo-padd-lr-20">
                                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                                    {Object.entries(
                                                        item.actions
                                                    ).map(([key, action]) => (
                                                        <div
                                                            key={key}
                                                            className="custom-control custom-checkbox form-check-inline"
                                                        >
                                                            <input
                                                                className="custom-control-input"
                                                                type="checkbox"
                                                                id={`inlineCheckbox-${action.id}`}
                                                                value={
                                                                    action.id
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    const indexItem =
                                                                        data.permissions.findIndex(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item ===
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                        );
                                                                    if (
                                                                        indexItem ===
                                                                        -1
                                                                    ) {
                                                                        // Item is not in the array, so add it
                                                                        setData(
                                                                            produce(
                                                                                (
                                                                                    draft
                                                                                ) => {
                                                                                    draft.permissions.push(
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    );
                                                                                }
                                                                            )
                                                                        );
                                                                    } else {
                                                                        // Item is already in the array, so remove it
                                                                        setData(
                                                                            produce(
                                                                                (
                                                                                    draft
                                                                                ) => {
                                                                                    draft.permissions.splice(
                                                                                        indexItem,
                                                                                        1
                                                                                    );
                                                                                }
                                                                            )
                                                                        );
                                                                    }
                                                                }}
                                                            />
                                                            <label
                                                                className="custom-control-label text-capitalize"
                                                                htmlFor={`inlineCheckbox-${action.id}`}
                                                            >
                                                                <span className="custom-control-shadow" />{" "}
                                                                {key}
                                                            </label>
                                                        </div>
                                                    ))}
                                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                                </div>
                                            </div>
                                        </Fragment>
                                    ))}
                                    <div className="mt-3">
                                        <button
                                            type="submit"
                                            className="btn btn-success"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                </div>
                            </div>
                        </div>
                        <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                    </div>
                </form>
            </div>
        </AdminLayouts>
    );
}
