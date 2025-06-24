import { Alert, AlertDescription, AlertTitle, Button, Input, Label, Textarea } from '@/components/ui';
import { Checks_API_URL } from '@/conts/conts';
import { useFetchComponentBySystemId, useFetchSystems } from '@/hooks/Fetch';
import type { Check } from '@/type/System';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Terminal } from 'lucide-react';
import { useEffect, useReducer, useState } from 'react';
import type { FormEvent } from 'react';

interface FormCheckProps {
    check?: Check;
    onSuccess?: () => void;
}

type FormState = Omit<Check, 'id' | 'serviceSystemId' | 'componentId'> & {
    serviceSystemId: number | null;
    componentId: number | null;
};

const initialState: FormState = {
    name: '',
    serviceSystemId: null,
    componentId: null,
    checkUrl: '',
    checkInterval: 60,
    checkTimeout: 10,
    requestHeaders: '',
    downAlertDelay: 60,
    downAlertResend: 60,
    downAlertMessage: '',
    alertEmail: '',
};

type FormAction =
    | { type: 'SET_FIELD'; field: keyof FormState; value: string | number | null }
    | { type: 'RESET_FORM'; payload?: FormState };

const formReducer = (state: FormState, action: FormAction): FormState => {
    switch (action.type) {
        case 'SET_FIELD':
            return { ...state, [action.field]: action.value };
        case 'RESET_FORM':
            return action.payload || initialState;
        default:
            return state;
    }
};

export const FormCheck = ({ check, onSuccess }: FormCheckProps) => {
    const [formState, dispatch] = useReducer(formReducer, initialState);
    const [validationError, setValidationError] = useState<string | null>(null);
    const queryClient = useQueryClient();

    const {
        data: systems,
        isLoading: isLoadingSystems,
        isError: isErrorSystems,
    } = useQuery({ queryKey: ['systems'], queryFn: useFetchSystems });

    const {
        data: components,
        isLoading: isLoadingComponents,
        isError: isErrorComponents,
    } = useQuery({
        queryKey: ['components', formState.serviceSystemId],
        queryFn: () => useFetchComponentBySystemId(formState.serviceSystemId?.toString() || ''),
        enabled: !!formState.serviceSystemId,
    });

    useEffect(() => {
        if (check) {
            dispatch({
                type: 'RESET_FORM',
                payload: {
                    name: check.name,
                    serviceSystemId: check.serviceSystemId,
                    componentId: check.componentId,
                    checkUrl: check.checkUrl,
                    checkInterval: check.checkInterval,
                    checkTimeout: check.checkTimeout,
                    requestHeaders: check.requestHeaders,
                    downAlertDelay: check.downAlertDelay,
                    downAlertResend: check.downAlertResend,
                    downAlertMessage: check.downAlertMessage,
                    alertEmail: check.alertEmail,
                },
            });
        }
    }, [check]);

    const { mutate, isPending, error } = useMutation({
        mutationFn: async (newCheck: Omit<Check, 'id'>) => {
            const method = check ? 'PUT' : 'POST';
            const body = check ? JSON.stringify({ id: check.id, ...newCheck }) : JSON.stringify(newCheck);

            const url = check ? `${Checks_API_URL}/${check.id}` : Checks_API_URL;
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body,
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || `Failed to ${check ? 'update' : 'create'} check`);
            }
            return res.json();
        },
        onSuccess: () => {
            queryClient
                .invalidateQueries({ queryKey: ['checks'] })
                .then(r => console.log('Invalidated checks query:', r));
            dispatch({ type: 'RESET_FORM' });
            if (onSuccess) onSuccess();
        },
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (formState.serviceSystemId === null || formState.componentId === null) {
            setValidationError('Please select a system and component');
            return;
        }
        setValidationError(null);
        mutate(formState as Omit<Check, 'id'>);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
                {validationError && (
                    <Alert variant="destructive">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{validationError}</AlertDescription>
                    </Alert>
                )}
                {error && (
                    <Alert variant="destructive">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error.message}</AlertDescription>
                    </Alert>
                )}
                <div className="grid gap-3">
                    <Label htmlFor="name">Check Name</Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Enter check name"
                        required
                        value={formState.name}
                        onChange={e => dispatch({ type: 'SET_FIELD', field: 'name', value: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="grid gap-3">
                        <Label htmlFor="serviceSystemId">Service System</Label>
                        <select
                            id="serviceSystemId"
                            value={formState.serviceSystemId?.toString() || ''}
                            onChange={e => {
                                const value = e.target.value ? Number.parseInt(e.target.value) : null;
                                dispatch({ type: 'SET_FIELD', field: 'serviceSystemId', value });
                                dispatch({ type: 'SET_FIELD', field: 'componentId', value: null });
                            }}
                            disabled={isLoadingSystems || isErrorSystems}
                            required
                            className="w-full p-2 text-sm border rounded-md dark:bg-gray-900 dark:text-gray-300"
                        >
                            <option value="" disabled>
                                Select system
                            </option>
                            {!isLoadingSystems &&
                                !isErrorSystems &&
                                systems?.map(system => (
                                    <option key={system.id} value={system.id.toString()}>
                                        {system.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="componentId">Component</Label>
                        <select
                            id="componentId"
                            value={formState.componentId?.toString() || ''}
                            onChange={e =>
                                dispatch({
                                    type: 'SET_FIELD',
                                    field: 'componentId',
                                    value: e.target.value ? Number.parseInt(e.target.value) : null,
                                })
                            }
                            disabled={isLoadingComponents || isErrorComponents}
                            required
                            className="w-full p-2 text-sm border rounded-md dark:bg-gray-900 dark:text-gray-300"
                        >
                            <option value="" disabled>
                                Select component
                            </option>
                            {!isLoadingComponents &&
                                !isErrorComponents &&
                                components?.map(component => (
                                    <option key={component.id} value={component.id.toString()}>
                                        {component.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="checkUrl">Check URL</Label>
                    <Input
                        id="checkUrl"
                        type="text"
                        placeholder="Enter check URL"
                        required
                        value={formState.checkUrl}
                        onChange={e => dispatch({ type: 'SET_FIELD', field: 'checkUrl', value: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="grid gap-3">
                        <Label htmlFor="checkInterval">Check Interval (minutes)</Label>
                        <Input
                            id="checkInterval"
                            type="number"
                            min={1}
                            value={formState.checkInterval}
                            onChange={e =>
                                dispatch({
                                    type: 'SET_FIELD',
                                    field: 'checkInterval',
                                    value: Number.parseInt(e.target.value),
                                })
                            }
                        />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="checkTimeout">Check Timeout (minutes)</Label>
                        <Input
                            id="checkTimeout"
                            type="number"
                            min={1}
                            value={formState.checkTimeout}
                            onChange={e =>
                                dispatch({
                                    type: 'SET_FIELD',
                                    field: 'checkTimeout',
                                    value: Number.parseInt(e.target.value),
                                })
                            }
                        />
                    </div>
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="requestHeaders">Request Headers (JSON)</Label>
                    <Textarea
                        id="requestHeaders"
                        placeholder="Enter request headers as JSON"
                        value={formState.requestHeaders}
                        onChange={e => dispatch({ type: 'SET_FIELD', field: 'requestHeaders', value: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="grid gap-3">
                        <Label htmlFor="downAlertDelay">Down Alert Delay (seconds)</Label>
                        <Input
                            id="downAlertDelay"
                            type="number"
                            min={1}
                            value={formState.downAlertDelay}
                            onChange={e =>
                                dispatch({
                                    type: 'SET_FIELD',
                                    field: 'downAlertDelay',
                                    value: Number.parseInt(e.target.value),
                                })
                            }
                        />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="downAlertResend">Down Alert Resend (seconds)</Label>
                        <Input
                            id="downAlertResend"
                            type="number"
                            min={1}
                            value={formState.downAlertResend}
                            onChange={e =>
                                dispatch({
                                    type: 'SET_FIELD',
                                    field: 'downAlertResend',
                                    value: Number.parseInt(e.target.value),
                                })
                            }
                        />
                    </div>
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="downAlertMessage">Down Alert Message</Label>
                    <Textarea
                        id="downAlertMessage"
                        placeholder="Enter down alert message"
                        value={formState.downAlertMessage}
                        onChange={e =>
                            dispatch({ type: 'SET_FIELD', field: 'downAlertMessage', value: e.target.value })
                        }
                    />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="alertEmail">Alert Email</Label>
                    <Input
                        id="alertEmail"
                        type="email"
                        placeholder="Enter alert email"
                        required
                        value={formState.alertEmail}
                        onChange={e => dispatch({ type: 'SET_FIELD', field: 'alertEmail', value: e.target.value })}
                    />
                </div>

                <Button type="submit" disabled={isPending}>
                    {isPending ? 'Saving...' : check ? 'Update Check' : 'Create Check'}
                </Button>
            </div>
        </form>
    );
};
